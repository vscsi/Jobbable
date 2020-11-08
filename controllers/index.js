
const pg = require('pg');
const { pool } = require('../models/database');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "jobbable",
        user: "postgres",
        password: "postgres"
    }
});

const page_limit = 10;
//routes
exports.getIndex = async(req, res, next) => {
   
    let cur_page;
    
    if (req.params.page){
        cur_page = req.params.page;
    } else {
        cur_page = 1;
    }
    
    let offset = (cur_page - 1) * page_limit;

    let total_rows_count = 0

    pool.query(`select company,title,location,created_at,company_logo,status,job_type, id from jobs`
        , (err, rows_count_results) => {
            total_rows_count = rows_count_results.rowCount

            pool.query(`
            select company,title,created_at,company_logo,status,job_type, id
            from jobs
            limit ` + page_limit + ` offset ` + offset
            , (err, results) => {
                if (err) {
                    console.log(err)
                }

                let no_of_page = Math.ceil(total_rows_count / page_limit)
                // console.log(results.rows[0].company);
                // console.log(results.rows);
                res.render('index', {
                    pageTitle: 'Index Page',
                    path: '/',
                    //companies: 'test'
                    companies: results.rows,
                    no_of_page: no_of_page,
                    cur_page: cur_page
                });
            });

        }        
    )
}


exports.postIndex = async (req, res, next) => {
    //filtering jobs
    //user search in search box , receive names in server 
    //user:parameter method to render  after search page
    
    let { search, company, location } = req.body
    console.log(search)
    
    let query = await knex.raw(
        `SELECT *        
         FROM
             skilltag
         WHERE LOWER(skilltag_name) LIKE LOWER('${search}%')`

    );
        console.log(query.rows)
        let targetIds = [];
    query.rows.forEach((item,index)=>{
        let resultRows = item.id;
        targetIds.push(resultRows)
    })
    console.log(targetIds)


    let jobsSkillTagIds = [];
    for(let targetId of targetIds){
        let data = await knex.select('jobs_id').from('jobs_skilltag').where('skilltag_id', `${targetId}`) 
        jobsSkillTagIds.push(data[0].jobs_id);
        console.log(jobsSkillTagIds)
    }


    let jobsInfo = {};
    let jobsInfoArr =[] // in order for ejs page to loop through 
    for (let jobsSkillTagId of jobsSkillTagIds){
        let data = await knex.select('company','title','created_at','company_logo','status','job_type', 'id').from('jobs').where('id', `${jobsSkillTagId}`)
        jobsInfo['company'] = data[0].company;
        jobsInfo['title'] = data[0].title;
        jobsInfo['created_at'] = data[0].created_at;
        jobsInfo['company_logo'] = data[0].company_logo;
        jobsInfo['status'] = data[0].status;
        jobsInfo['job_type'] = data[0].job_type;
        jobsInfo['id']=data[0].id;
        jobsInfoArr.push(jobsInfo);
        console.log(jobsInfoArr);
    }    

    res.render('index_afterSearch',{
        pageTitle: 'Index Page',
        jobsInfo:jobsInfoArr,
        
    })
}
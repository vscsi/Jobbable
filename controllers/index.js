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

//routes
exports.getIndex = async(req, res, next) => {
    // let query = knex.select('jobs_skilltag'); 
    // let ;

    // query data from jobs_skilltag table as tags onto the website



    pool.query(`
    select company,title,created_at,company_logo,status,job_type, id
    from jobs 
    limit 10
    `, (err, results) => {
        if (err) {
            console.log(err)
        }
        // console.log(results.rows[0].company);
        // console.log(results.rows);
        res.render('index', {
            pageTitle: 'Index Page',
            path: '/',
            companies: results.rows
        });
    });

}

exports.postIndex = async (req, res, next) => {
    //filtering jobs
    //user search in search box , receive names in server 
    //user:parameter method to render  after search page

    let { search } = req.body
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
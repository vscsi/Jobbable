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
    select company,title,created_at,company_logo,status,job_type, id, location
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
            jobsInfoArr: results.rows
        });
    });

}

exports.postIndex = async(req, res, next) => {
    //filtering jobs
    //user search in search box , receive names in server 
    //user:parameter method to render  after search page

    let { search } = req.body
    console.log(search)

        

    let data = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('description', 'ilike', `%${search}%`);
    let location = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${search}%`);
    let company = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${search}%`);
    console.log(location, 'fuckrs');
    if (data.length > 0) {


        let jobsInfo = {};
        let jobsInfoArr = [] // in order for ejs page to loop through 
       for(let i =0; i<data.length; i++){
           jobsInfo['company'] = data[i].company;
           jobsInfo['title'] = data[i].title;
           jobsInfo['created_at'] = data[i].created_at;
           jobsInfo['company_logo'] = data[i].company_logo;
           jobsInfo['status'] = data[i].status;
           jobsInfo['job_type'] = data[i].job_type;
           jobsInfo['id'] = data[i].id;
           jobsInfo['location']=data[i].location;
           jobsInfoArr.push(jobsInfo);
           
        }
        console.log(jobsInfoArr);
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: jobsInfoArr,
            

        })

    } else if(location.length>0){
        
            let jobsInfo = {};
            let jobsInfoArr = [];

            for(let i =0; i<location.length; i++){

                jobsInfo['company'] = location[i].company;
                jobsInfo['title'] = location[i].title;
                jobsInfo['created_at'] = location[i].created_at;
                jobsInfo['company_logo'] = location[i].company_logo;
                jobsInfo['status'] = location[i].status;
                jobsInfo['job_type'] = location[i].job_type;
                jobsInfo['id'] = location[i].id;
                jobsInfo['location']=location[i].location;
                console.log(jobsInfo);
                
            }
            jobsInfoArr.push(jobsInfo);
            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfo: jobsInfoArr,
    
            })

        } else{
            let jobsInfo = {};
            let jobsInfoArr = [];

            for(let i =0; i<company.length; i++){

                jobsInfo['company'] = company[i].company;
                jobsInfo['title'] = company[i].title;
                jobsInfo['created_at'] = company[i].created_at;
                jobsInfo['company_logo'] = company[i].company_logo;
                jobsInfo['status'] = company[i].status;
                jobsInfo['job_type'] = company[i].job_type;
                jobsInfo['id'] = company[i].id;
                jobsInfo['location']=company[i].location;
                console.log(jobsInfo);
                
            }
            jobsInfoArr.push(jobsInfo);
            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfo: jobsInfoArr,
    
            })

        }
        

    }


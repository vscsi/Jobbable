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
    select company,title,created_at,company_logo,status,job_type, id, location, description
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

    let { skill,nameLocation,nameCompany } = req.body
    console.log(skill)
    console.log(nameLocation)
    console.log(nameCompany)

    let data = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location','description').where('description', 'ilike', `%${skill}%`);
    let location = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${nameLocation}%`);
    let company = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${nameCompany}%`);
    console.log(data.description, 'fuckrs');
    if (skill && data.length > 0) {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: data,
        })

    } else if(nameLocation && location.length>0){
        
            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: location,
    
            })

        } else{
            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: company,
    
            })

        }
        

    }


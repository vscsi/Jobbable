const pg = require('pg');
const {
    pool
} = require('../models/database');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "jobbable",
        user: "postgres",
        password: "postgres"
    }
});


//routes

exports.getIndex = async (req, res, next) => {

    let showjobs = await knex('jobs').orderBy('status', 'desc').limit(10)

    let showskills = await knex('jobs').join('jobs_skilltag', 'jobs.id', 'jobs_skilltag.jobs_id').select('jobs.id', 'jobs_skilltag.jobs_id', 'jobs_skilltag.skilltag_id'); 

    console.log(showskills, 'MOTHERFUCKERS')

    res.render('index', {
        pageTitle: 'Index Page',
        jobsInfoArr: showjobs

    })
}

exports.postIndex = async (req, res, next) => {
    //filtering jobs
    //user search in search box , receive names in server 
    //user:parameter method to render  after search page


    let {
        skill,
        nameLocation,
        nameCompany
    } = req.body
    console.log(skill)
    console.log(nameLocation)
    console.log(nameCompany)

    let data = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${skill}%`);
    let location = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${nameLocation}%`);
    let company = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${nameCompany}%`);
    // console.log(data.description, 'fuckrs');

    if (skill && data.length > 0) {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: data,
        })

    } else if (nameLocation && location.length > 0) {

        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: location,

        })

    }  else {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: company,

        })

    }
}
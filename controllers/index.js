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

    // let showskills = await knex('jobs').join('jobs_skilltag', 'jobs.id', 'jobs_skilltag.jobs_id').select('jobs.id', 'jobs_skilltag.jobs_id', 'jobs_skilltag.skilltag_id'); 
    
    let showskills = await knex('skilltag')
    .join('jobs_skilltag', 'skilltag.id', 'jobs_skilltag.skilltag_id')
    .select('skilltag.skilltag_name', 'jobs_skilltag.jobs_id', 'jobs_skilltag.skilltag_id')
    .where({jobs_id: '1'})

    console.log(showskills, 'MOTHERFUCKERS')

    let justskilltags = [];

    for(let i=0; i<showskills.length; i++){
        justskilltags.push(showskills[i].skilltag_name)
    }

    console.log(justskilltags, `WEEEEEEEEEEEEE`)

    
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
        nameCompany,
        nameJobType
    } = req.body
    // console.log(skill)
    // console.log(nameLocation)
    // console.log(nameCompany)
    console.log(nameJobType)

    let data = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${skill}%`);
    let location = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${nameLocation}%`);
    let company = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${nameCompany}%`);
    let jobType = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('job_type', 'ilike', `%${nameJobType}%`);
    // console.log(data.description, 'fuckrs');

     if (data.length > 0) {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: data,
        })

    } else if ( location.length > 0) {

        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: location,

        })

    }  else if(company.length>0) {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: company,

        })
    }else if( jobType.length>0) {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: jobType,

        })
    }else{
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: ''

        })
    }

}
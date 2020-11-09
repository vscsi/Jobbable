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

//passport middleware
// exports.checkIndexAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return res.redirect('/dashboard')
//     }
//     // console.log(`${req} yoyoyo2`)
//     next();
// }


//routes
exports.getIndex = async (req, res, next) => {

    let cur_page;

    if (req.params.page) {
        cur_page = req.params.page;
    } else {
        cur_page = 1;
    }

    let query = await knex('jobs').select();

    let queryLength = query.length

    let totalPage = await knex('jobs').orderBy('status', 'desc').limit(10);

    let totalPageLength = totalPage.length;

    let noOfPage = Math.ceil(queryLength / totalPageLength)

    res.render('index', {
        pageTitle: 'Index Page',
        path: '/',
        jobsInfoArr: totalPage,
        noOfPage: noOfPage,
        cur_page: cur_page,
    });

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
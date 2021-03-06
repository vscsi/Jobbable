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


    if (req.user === undefined) {

        let query = await knex('jobs').orderBy('status', 'desc');


        res.render('index', {
            pageTitle: 'Index Page',
            path: '/',
            jobsInfoArr: query,
            user: undefined
        });


    } else {

        let query = await knex('jobs').orderBy('status', 'desc');


        res.render('index', {
            pageTitle: 'Index Page',
            path: '/',
            jobsInfoArr: query,
            user: req.user
        })

    }
}

exports.postIndex = async (req, res, next) => {
    //filtering jobs
    //user search in search box , receive names in server 
    //user:parameter method to render  after search page

    let {
        skill,
        nameLocation,
        nameCompany,
    } = req.body

    console.log(req.body)


    let dataQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description', 'how_to_apply').where('description', 'ilike', `%${skill}%`);
    let locationQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'how_to_apply').where('location', 'ilike', `%${nameLocation}%`);
    let companyQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'how_to_apply').where('company', 'ilike', `%${nameCompany}%`);

    console.log(companyQuery)

    console.log(req.user)


    if (req.user === undefined) {


        if (dataQuery.length > 0) {

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: dataQuery,
                user: undefined
            })

        } else if (locationQuery.length > 0) {

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: locationQuery,
                user: undefined
            })

        } else if (companyQuery.length > 0) {


            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: companyQuery,
                user: undefined
            })
        } else {
            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: '',
                user: undefined

            })
        }
    } else {

        if (dataQuery.length > 0) {

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: dataQuery,
                user: req.user.id
            })



        } else if (locationQuery.length > 0) {

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: locationQuery,
                user: req.user.id
            })

        } else if (companyQuery.length > 0) {

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: companyQuery,
                user: req.user.id
            })
        }

    }

}
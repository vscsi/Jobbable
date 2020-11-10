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
            user: undefined
        });
    } else {
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
            user: req.user
        })

    }
}

exports.postIndex = async (req, res, next) => {
    //filtering jobs
    //user search in search box , receive names in server 
    //user:parameter method to render  after search page
    let cur_page;

    if (req.params.page) {
        cur_page = req.params.page;
    } else {
        cur_page = 1;
    }


    let {
        skill,
        nameLocation,
        nameCompany,
    } = req.body


    let dataQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${skill}%`);
    let locationQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${nameLocation}%`);
    let companyQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${nameCompany}%`);



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
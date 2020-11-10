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
    // if(req.user === undefined) {console.log(req.user, 'yeaaaa')};


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
        search,
        location,
        company,
    } = req.body
    // console.log(skill)
    // console.log(nameLocation)
    // console.log(nameCompany)
    // console.log(nameJobType)



    let dataQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${search}%`);
    // let dataLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${search}%`).orderBy('status', 'desc').limit(10);
    let locationQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${location}%`);
    // let locationLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${location}%`).orderBy('status', 'desc').limit(10);
    let companyQuery = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${company}%`);
    // let companyLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${company}%`).orderBy('status', 'desc').limit(10);
    // let jobType = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('job_type', 'ilike', `%${jobType}%`);
    // let jobTypeLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('job_type', 'ilike', `%${jobType}%`).orderBy('status', 'desc').limit(10);



    if (req.user === undefined) {



        if (dataQuery.length > 0) {
            // let query = await knex('jobs').select();

            // console.log(data)

            // let dataLength = data.length

            // let totalPageLength = dataLimit10.length;

            // let noOfPage = Math.ceil(dataLength / totalPageLength)

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: dataQuery,
                user: undefined
                // noOfPage: noOfPage,
                // cur_page: cur_page
            })

        } else if (locationQuery.length > 0) {

            // let locationLength = location.length

            // let totalPageLength = locationLimit10.length;

            // let noOfPage = Math.ceil(locationLength / totalPageLength)

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: locationQuery,
                user: undefined
                // noOfPage: noOfPage,
                // cur_page: cur_page

            })

        } else if (companyQuery.length > 0) {

            // let companyLength = company.length

            // let totalPageLength = companyLimit10.length;

            // let noOfPage = Math.ceil(companyLength / totalPageLength)

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: companyQuery,
                user: undefined
                // noOfPage: noOfPage,
                // cur_page: cur_page

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
            // let query = await knex('jobs').select();

            // console.log(data)

            // let dataLength = data.length

            // let totalPageLength = dataLimit10.length;

            // let noOfPage = Math.ceil(dataLength / totalPageLength)

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: dataQuery,
                user: req.user.id
                // noOfPage: noOfPage,
                // cur_page: cur_page
            })


        } else if (locationQuery.length > 0) {

            // let locationLength = location.length

            // let totalPageLength = locationLimit10.length;

            // let noOfPage = Math.ceil(locationLength / totalPageLength)

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: locationQuery,
                user: req.user.id
                // noOfPage: noOfPage,
                // cur_page: cur_page

            })

        } else if (companyQuery.length > 0) {

            // let companyLength = company.length

            // let totalPageLength = companyLimit10.length;

            // let noOfPage = Math.ceil(companyLength / totalPageLength)

            res.render('index', {
                pageTitle: 'Index Page',
                jobsInfoArr: companyQuery,
                user: req.user.id
                // noOfPage: noOfPage,
                // cur_page: cur_page
            })
        }

    }

}
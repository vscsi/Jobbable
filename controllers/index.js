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
exports.getIndex = async(req, res, next) => {
    // if(req.user === undefined) {console.log(req.user, 'yeaaaa')};
    let user1 = {}
    
    console.log(user1.length)
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
                }
            )
 
        }
    }
 
        exports.postIndex = async(req, res, next) => {
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
                nameJobType
            } = req.body
                // console.log(skill)
                // console.log(nameLocation)
                // console.log(nameCompany)
            console.log(nameJobType)
 
 
 
            let data = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${skill}%`);
            let dataLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${skill}%`).orderBy('status', 'desc').limit(10);
            let location = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${nameLocation}%`);
            let locationLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${nameLocation}%`).orderBy('status', 'desc').limit(10);
            let company = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${nameCompany}%`);
            let companyLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${nameCompany}%`).orderBy('status', 'desc').limit(10);
            let jobType = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('job_type', 'ilike', `%${nameJobType}%`);
            let jobTypeLimit10 = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('job_type', 'ilike', `%${nameJobType}%`).orderBy('status', 'desc').limit(10);
 
            if (data.length > 0) {
                // let query = await knex('jobs').select();
 
                let dataLength = data.length
 
                let totalPageLength = dataLimit10.length;
 
                let noOfPage = Math.ceil(dataLength / totalPageLength)
 
                res.render('index', {
                    pageTitle: 'Index Page',
                    jobsInfoArr: data,
                    noOfPage: noOfPage,
                    cur_page: cur_page
                })
 
            } else if (location.length > 0) {
 
                let locationLength = location.length
 
                let totalPageLength = locationLimit10.length;
 
                let noOfPage = Math.ceil(locationLength / totalPageLength)
 
                res.render('index', {
                    pageTitle: 'Index Page',
                    jobsInfoArr: location,
                    noOfPage: noOfPage,
                    cur_page: cur_page
 
                })
 
            } else if (company.length > 0) {
 
                let companyLength = company.length
 
                let totalPageLength = companyLimit10.length;
 
                let noOfPage = Math.ceil(companyLength / totalPageLength)
 
                res.render('index', {
                    pageTitle: 'Index Page',
                    jobsInfoArr: company,
                    noOfPage: noOfPage,
                    cur_page: cur_page
 
                })
            } else if (jobType.length > 0) {
 
                let jobTypeLength = jobType.length
 
                let totalPageLength = jobTypeLimit10.length;
 
                let noOfPage = Math.ceil(jobTypeLength / totalPageLength)
 
                res.render('index', {
                    pageTitle: 'Index Page',
                    jobsInfoArr: jobType,
                    noOfPage: noOfPage,
                    cur_page: cur_page
 
                })
            } else {
                res.render('index', {
                    pageTitle: 'Index Page',
                    jobsInfoArr: ''
 
                })
            }
 
        }


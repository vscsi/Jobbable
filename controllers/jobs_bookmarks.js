// const pg = require('pg');
// const { pool } = require('../models/database');
// const knex = require('knex')({
//     client: 'postgresql',
//     connection: {
//         database: "jobbable",
//         user: "postgres",
//         password: "postgres"
//     }
// });

const knex = require('../models/knex');

// const user_role = 1;
// const page_limit = 10;


//routes
exports.getJobsBookmark = async(req, res, next) => {

    let query = await knex.from('jobs_bookmarks').select().where('employees_id', `${req.user.id}`);
    console.log(query, `testjobsbookmark`)

    let jobsId = [];

    for (let i = 0; i < query.length; i++) {
        jobsId.push(query[i].jobs_id)
    }

    let jobQueries;

    let jobQueriesArr = []

    for (let j = 0; j < jobsId.length; j++) {
        jobQueries = await knex('jobs').select().where('id', `${jobsId[j]}`)

        jobQueriesArr.push(jobQueries[0])
    }

    console.log(jobQueriesArr)



    // // let query = knex.select('jobs_skilltag'); 
    // // let ;
    // let cur_page;
    
    // if (req.params.page){
    //     cur_page = req.params.page
    // } else {
    //     cur_page = 1
    // }
    
    // let offset = (cur_page - 1) * page_limit

    // let employee_id = 1

    // // query data from jobs_skilltag table as tags onto the website
    
    
    //     console.log('user role 1')

    //     //sql in jobs_bookmark
    //     //select company, title, location, status from jobs j, jobs_bookmarks jb where j.id = jb.jobs_id and jb.employee_id = 1

    //     pool.query(`select company, title, location, status from jobs j, jobs_bookmarks jb where j.id = jb.jobs_id and jb.employee_id = ` + employee_id + ` order by title asc
    //         limit ` + page_limit + ` offset ` + offset
    //         , (err, results) => {
    //             if (err) {
    //                 console.log(err)
    //             }
                // console.log(results.rows[0].company);
                // console.log(results.rows);
                res.render('users/jobs_bookmarks', {
                    pageTitle: 'Jobs Bookmark',
                    pageHeader: 'Jobs Bookmark',
                    path: '/',
                    //companies: 'test'
                    // companies: results.rows,
                    // user_role:user_role,
                    jobQueries: jobQueriesArr
                })
    }
                // exports.postJobHist = async (req, res, next) => {
    
    
// }

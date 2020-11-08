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

const user_role = 2;
const page_limit = 10;


//routes
exports.getApplyHistory = async(req, res, next) => {
    // let query = knex.select('jobs_skilltag'); 
    // let ;
    let cur_page;
    
    if (req.params.page){
        cur_page = req.params.page
    } else {
        cur_page = 1
    }
    
    let offset = (cur_page - 1) * page_limit

    let employee_id = 1

    // query data from jobs_skilltag table as tags onto the website
    
    
        console.log('user role 1')

        //sql in jobs_bookmark
        //select company, title, location, status from jobs j, jobs_bookmarks jb where j.id = jb.jobs_id and jb.employee_id = 1

        pool.query(`select company, title, location, status from jobs j, jobs_bookmarks jb where j.id = jb.jobs_id and jb.employee_id = ` + employee_id + ` order by title asc
            limit ` + page_limit + ` offset ` + offset
            , (err, results) => {
                if (err) {
                    console.log(err)
                }
                // console.log(results.rows[0].company);
                // console.log(results.rows);
                res.render('users/applied-history', {
                    pageTitle: 'Applied History',
                    pageHeader: 'Applied History',
                    path: '/',
                    //companies: 'test'
                    companies: results.rows
                });
            });
    
    
}

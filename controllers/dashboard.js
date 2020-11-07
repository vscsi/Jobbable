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
let cur_page = 1;
const offset = (cur_page - 1) * page_limit;


//routes
exports.getDashboard = async(req, res, next) => {
    // let query = knex.select('jobs_skilltag'); 
    // let ;

    // query data from jobs_skilltag table as tags onto the website
    console.log(user_role)
    if (user_role === 1) {
        console.log('user role 1')

        // sql in jobs_bookmark
        // select company, title, location, status from jobs j, jobs_bookmarks jb where j.id = jb.jobs_id and jb.employee_id = 1

        pool.query(`
            select company,title,location,created_at,company_logo,status,job_type, id
            from jobs order by title desc
            limit ` + page_limit + ` offset ` + offset
            , (err, results) => {
                if (err) {
                    console.log(err)
                }
                // console.log(results.rows[0].company);
                console.log(results.rows);
                res.render('users/user-dashboard', {
                    pageTitle: 'Dashboard',
                    pageHeader: 'Employees fitting the criterion',
                    // companies: 'test'
                    companies: results.rows
                });
            });
    } else if (user_role === 2){
        console.log('user role 2')
        pool.query(`select company,title,location,created_at,company_logo,status,job_type, id
            from jobs order by title asc
            limit ` + page_limit + ` offset ` + offset
            , (err, results) => {
                if (err) {
                    console.log(err)
                }
                // console.log(results.rows[0].company);
                console.log(results.rows);
                res.render('users/user-dashboard', {
                    pageTitle: 'Dashboard',
                    pageHeader: 'Employers fitting the criterion',
                    // companies: 'test'
                    companies: results.rows
                });
            });
    }
    
}
/*
exports.setPage = async(req, res, next) => {
    cur_page = 2;
}
*/
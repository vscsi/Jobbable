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

const user_role = 1;
const page_limit = 10;


//routes
exports.getDashboard = async(req, res, next) => {
    // let query = knex.select('jobs_skilltag'); 
    // let ;
    //console.log(req.user.first_name)
    let cur_page;

    res.locals.user_role = user_role
    
    if (req.params.page){
        cur_page = req.params.page;
    } else {
        cur_page = 1;
    }
    
    let offset = (cur_page - 1) * page_limit;

    // query data from jobs_skilltag table as tags onto the website
    
    if (user_role === 1) {
        console.log('user role 1')

        //sql in jobs_bookmark
        //select company, title, location, status from jobs j, jobs_bookmarks jb where j.id = jb.jobs_id and jb.employee_id = 1
        let total_rows_count

        pool.query(`select company,title,location,created_at,company_logo,status,job_type, id from jobs`
            , (err, rows_count_results) => {
                total_rows_count = rows_count_results.rowCount
            }        
        )

        pool.query(`
            select company,title,location,created_at,company_logo,status,job_type, id
            from jobs order by title asc
            limit ` + page_limit + ` offset ` + offset
            , (err, results) => {
                if (err) {
                    console.log(err)
                }

                let no_of_page = Math.ceil(total_rows_count / page_limit)
                // console.log(results.rows[0].company);
                // console.log(results.rows);
                res.render('users/user-dashboard', {
                    pageTitle: 'Dashboard > Employers',
                    pageHeader: 'Talents Pool',
                    path: '/',
                    //companies: 'test'
                    companies: results.rows,
                    no_of_page: no_of_page,
                    cur_page: cur_page
                });
            });
    } else if (user_role === 2){
        console.log('user role 2')
        let total_rows_count

        pool.query(`select company,title,location,created_at,company_logo,status,job_type, id from jobs`
            , (err, rows_count_results) => {
                total_rows_count = rows_count_results.rowCount
            }        
        )

        pool.query(`select company,title,location,created_at,company_logo,status,job_type, id
            from jobs order by title asc
            limit ` + page_limit + ` offset ` + offset
            , (err, results) => {
                if (err) {
                    console.log(err)
                }

                let no_of_page = Math.ceil(total_rows_count / page_limit)
                // console.log(results.rows[0].company);
                // console.log(results.rows);
                res.render('users/user-dashboard', {
                    pageTitle: 'Dashboard > Employees',
                    pageHeader: 'Jobs Bookmarks',
                    path: '/',
                    //companies: 'test'
                    companies: results.rows,
                    no_of_page: no_of_page,
                    cur_page: cur_page
                });
            });
    }
    
}

const pg = require('pg');
const {
    pool
} = require('../models/database');

const page_limit = 10;


//routes
exports.getDashboard = async(req, res, next) => {
    let username = req.user.username
    if (req.user.status === 'employee') {
        user_role = 1;
    } else {
        user_role = 2;
    }

    let cur_page;

    res.locals.user_role = user_role

    if (req.params.page) {
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

        await pool.query(`select company,title,location,created_at,company_logo,status,job_type, id from jobs`, (err, rows_count_results) => {
            total_rows_count = rows_count_results.rowCount
        })


        await pool.query(`
            select company,title,location,created_at,company_logo,status,job_type, id
            from jobs order by status desc
            limit ` + page_limit + ` offset ` + offset, (err, results) => {
            if (err) {
                console.log(err)
            }


            let no_of_page = Math.ceil(total_rows_count / page_limit)
            res.render('users/user-dashboard', {
                pageTitle: 'Dashboard > Employers',
                pageHeader: 'Talents Pool',
                path: '/',
                companies: results.rows,
                no_of_page: no_of_page,
                cur_page: cur_page,
                username: username,
                user_role: user_role

            })
        })

    } else if (user_role === 2) {
        console.log('user role 2')
        let total_rows_count

        pool.query(`select company,title,location,created_at,company_logo,status,job_type, id from jobs`, (err, rows_count_results) => {
            total_rows_count = rows_count_results.rowCount
        })

        pool.query(`select company,title,location,created_at,company_logo,status,job_type, id
            from jobs order by status desc
            limit ` + page_limit + ` offset ` + offset, (err, results) => {
            if (err) {
                console.log(err)
            }

            let no_of_page = Math.ceil(total_rows_count / page_limit)
            res.render('users/user-dashboard', {

                pageTitle: 'Dashboard > Employees',
                pageHeader: 'Jobs Bookmarks',
                path: '/',
                companies: results.rows,
                no_of_page: no_of_page,
                cur_page: cur_page,
                username: username,
                user_role: user_role
            });
        });
    }

}
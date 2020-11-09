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

    // pool.query(`select company,title,location,created_at,company_logo,status,job_type, id from jobs`, (err, rows_count_results) => {
    //     total_rows_count = rows_count_results.rowCount

    //     pool.query(`
    //         select company,title,created_at,company_logo,status,job_type, id
    //         from jobs
    //         status desc
    //         limit ` + page_limit + ` offset ` + offset, (err, results) => {
    //         if (err) {
    //             console.log(err)
    //         }

    //         let no_of_page = Math.ceil(total_rows_count / page_limit)
    //         // console.log(results.rows[0].company);
    //         // console.log(results.rows);
    //         res.render('index', {
    //             pageTitle: 'Index Page',
    //             path: '/',
    //             //companies: 'test'
    //             companies: results.rows,
    //             no_of_page: no_of_page,
    //             cur_page: cur_page
    //         });
    //     });

    // })
}


exports.postIndex = async (req, res, next) => {
    //filtering jobs
    //user search in search box , receive names in server 
    //user:parameter method to render  after search page

    let {
        skill,
        nameLocation,
        nameCompany
    } = req.body

    let data = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location', 'description').where('description', 'ilike', `%${skill}%`);
    let location = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('location', 'ilike', `%${nameLocation}%`);
    let company = await knex.from('jobs').select('company', 'title', 'created_at', 'company_logo', 'status', 'job_type', 'id', 'location').where('company', 'ilike', `%${nameCompany}%`);

    if (skill && data.length > 0) {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: data,
        })

    } else if (nameLocation && location.length > 0) {

        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: location,


        })

    } else {
        res.render('index', {
            pageTitle: 'Index Page',
            jobsInfoArr: company,

        })
    }
}
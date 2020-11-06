// const pg = require('pg');
// const express = require('express')
// const app = express();
// const ejs = require('ejs')
// const bodyParser = require('body-parser');
const { pool } = require('../models/database');

// app.set('view engine', 'ejs')
// app.use(express.urlencoded({ extended: true }))

//routes
exports.getIndex = (req, res, next) => {
    pool.query(`
    select company,title,created_at,company_logo,status,job_type
    from jobs 
    limit 10
    `, (err, results) => {
        if (err) {
            console.log(err)
        }
        // console.log(results.rows[0].company);
        console.log(results.rows);
    res.render('index', {
        pageTitle: 'Index Page',
        path: '/',
        companies: results.rows
    });
    });
}

exports.postIndex = (req, res, next) => {
 
}
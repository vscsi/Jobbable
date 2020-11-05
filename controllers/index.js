const pg = require('pg');
const express = require('express')
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const { pool } = require('../models/database');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

//routes
exports.getIndex = (req, res, next) => {
    pool.query(`
    select company 
    from jobs 
    limit 10
    `, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.log(results.rows[0].company);
    res.render('index', {
        pageTitle: 'Index Page',
        path: '/',
        company: results.rows[0].company
    });
    });
}

exports.postIndex = (req, res, next) => {
 
}
//Modules requirement
const path = require('path')
const express = require('express')
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const { pool } = require('../models/database');
const bcrypt = require('bcrypt');
require("dotenv").config();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('../models/passportConfig');
initializePassport(passport);

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })) // set to true for posting form

//setting initiazlize and sessions from passport
app.use(session({
    //key we want to keep secret which will encrypt all of our information
    secret: 'secret',
    //resave the value if something is changed
    resave: false,
    //save empty values if there is no values
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//user dashboard
exports.getUsers = (req, res, next) => {
        res.render('users/user-dashboard', {
            pageTitle: 'User Dashboard',
            path: '/users/dashboard'
        })
    }
    
//login page
exports.getLogin = (req, res, next) => {
    res.render('users/login', {
        pageTitle: 'Login',
        path: '/users/login'
    })
}
//Modules requirement
const path = require('path')
const express = require('express')
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const { pool } = require('../models/database');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: __dirname + '../models/.env' })
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const router = require('../routes/users');

const initializePassport = require('../models/passportConfig');
initializePassport(passport);

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })) // set to true for posting form

//setting initiazlize and sessions from passport
app.use(session({
    //key to keep secret which will encrypt all of our information
    secret: process.env.PASSPORT_SESSION_SECRET,
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
        path: '/users/login',
    })
}

exports.postLogin = (req, res, next) => {
    let {
        username,
        password,
    } = req.body;
    console.log(req.body)
}


//logout
exports.getLogout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You have logged out')
    res.redirect('/users/login');
}


/**Middleware */
//Passport local strategy authentication when ladning into pages
exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/dashboard')
    }
    console.log(`${req} yoyoyo2`)
    next();
}

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}
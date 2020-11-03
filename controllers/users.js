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
    //Registration page
exports.getRegister = (req, res, next) => {
    res.render('users/register', {
        pageTitle: 'Sign up',
        path: '/users/register'
    })
}

exports.postRegister = async(req, res, next) => {
    let { firstname, lastname, username, email, password, password2 } = req.body;
    // console.log(req.body)

    let errors = [];

    if (!firstname || !lastname || !username || !email || !password || !password2) {
        errors.push({ message: 'please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ message: 'Password should be at least 6 characters' })
    }

    if (password != password2) {
        errors.push({ message: 'Passwords do not match' })
    }

    if (errors.length > 0) {
        res.render('./users/register', { pageTitle: 'register', errors });
    } else {
        //form validation has passed
        let hashedPassword = await bcrypt.hash(password, 10);
        //  console.log(hashedPassword);
        //  query database to see if user email already exists in database

        //action: change statement to query employee/employer/admin tables
        pool.query(
            `select 1 from employees where username=$1`, [username], (err, results) => {
                if (err) {
                    console.log(err)
                }
                console.log(results.rows);
                if (results.rows.length > 0) {
                    errors.push({ message: "Username already registered" })
                    return res.render("./users/register", { pageTitle: 'register', errors });
                } else {
                    pool.query(
                        `insert into employees (first_name,last_name,username,email,password)
                        values ($1, $2, $3, $4, $5)
                        returning id, password`, [firstname, lastname, username, email, hashedPassword],
                        (err, results) => {
                            if (err) {
                                throw err
                            }
                            console.log(results.rows.password);
                            req.flash('success_msg', 'You are now registered. Please log in.')
                            res.redirect('/users/login')
                        }
                    )
                }
            }
        )
    }
}

//login page
exports.getLogin = (req, res, next) => {
    res.render('users/login', {
        pageTitle: 'Login',
        path: '/users/login',
    })
}

exports.postLogin = (req, res, next) => {
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
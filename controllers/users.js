//Modules requirement
// const path = require('path')
// const express = require('express')
// const app = express();
// const ejs = require('ejs')
// const bodyParser = require('body-parser');
// const { pool } = require('../models/database');
// const bcrypt = require('bcrypt');
// require('dotenv').config({ path: __dirname + '../models/.env' })
// const session = require('express-session');
// const flash = require('express-flash');
const passport = require('passport');
// const router = require('../routes/users');

const initializePassport = require('../models/passportConfig');
initializePassport(passport);

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/dashboard')
    }
    console.log(`${req} yoyoyo2`)
    next();
}

//user dashboard
exports.getUsers = (req, res, next) => {
        res.render('users/user-dashboard', {
            pageTitle: 'User Dashboard',
            path: '/users/dashboard'
        })
    }

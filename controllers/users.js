const passport = require('passport');

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

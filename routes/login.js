//==== Login routes ====//

////require modules
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

////passport set up
const { pool } = require('../models/database');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('../models/passportConfig');
initializePassport(passport);

router.use(express.urlencoded({ extended: true })) // set to true for posting form

const passportAuth = passport.authenticate(
    "local", {
        successRedirect: `/dashboard`,
        failureRedirect: '/login',
        failureFlash: true
    }
)

// setting initiazlize and sessions from passport
router.use(session({
    //key we want to keep secret which will encrypt all of our information
    secret: 'secret',
    //resave the value if something is changed
    resave: false,
    //save empty values if there is no values
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())
router.use(flash())


//get routes
router.get('/login', loginController.checkAuthenticated, loginController.getLogin)

router.get('/logout', loginController.getLogout);

//post routes
router.post('/login', passportAuth, loginController.postLogin)

module.exports = router;
//==== Routers set up ====//

////require modules
const path = require('path');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

//enviornment variables
require('dotenv').config({ path: __dirname + '../models/.env' })

////passport set up
const { pool } = require('../models/database');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('../models/passportConfig');
initializePassport(passport);

router.use(express.urlencoded({ extended: true })) // set to true for posting form

//setting initiazlize and sessions from passport
router.use(session({
    //key to keep secret which will encrypt all of our information
    secret: process.env.PASSPORT_SESSION_SECRET,
    //resave the value if something is changed
    resave: false,
    //save empty values if there is no values
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())
router.use(flash())

const passportAuth = passport.authenticate(
  "local",
  {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true,
      
  }
)

/**Routes */
//get the router from correct path

router.get('/dashboard', usersController.checkAuthenticated, usersController.getUsers)
router.get('/login', usersController.checkAuthenticated,usersController.getLogin)
router.get('/logout', usersController.getLogout);

//post in correct paths
router.post('/login', passportAuth, usersController.postLogin)


module.exports = router;
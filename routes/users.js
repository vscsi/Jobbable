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

/**Routes */
//get the router from correct path

router.get('/dashboard',  usersController.getUsers)



module.exports = router;
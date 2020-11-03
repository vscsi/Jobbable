//==== Routers set up ====//

//require modules
const path = require('path');
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

//get the router from correct path
router.get('/dashboard', usersController.getUsers)
router.get('/login', usersController.getLogin)

module.exports = router;
//==== dashboard route set up ====//

//require modules
//const path = require('path');
const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard');
const loginController = require('../controllers/login')


//get dashboard
router.get('/dashboard', loginController.checkNotAuthenticated, dashboardController.getDashboard)
router.get('/dashboard', loginController.checkNotAuthenticated,dashboardController.getDashboard)
router.get('/dashboard/:page', dashboardController.getDashboard)



module.exports = router;

//==== dashboard route set up ====//

//require modules
//const path = require('path');
const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard');
const loginController = require('../controllers/login')

//get the router from correct path
/*router.get('/dashboard', function (req, res){
    res.send('test');
});*/

//http://localhost:4000/


router.get('/dashboard', loginController.checkNotAuthenticated, dashboardController.getDashboard)
/*router.get('/dashboard/:page', dashboardController.setPage, dashboardController.getDashboard)*/

router.get('/dashboard', loginController.checkNotAuthenticated,dashboardController.getDashboard)
router.get('/dashboard/:page', dashboardController.getDashboard)

    //req.params.page


module.exports = router;

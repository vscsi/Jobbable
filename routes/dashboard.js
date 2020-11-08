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

<<<<<<< HEAD
router.get('/dashboard', loginController.checkNotAuthenticated,dashboardController.getDashboard)
/*router.get('/dashboard/:page', dashboardController.setPage, dashboardController.getDashboard)*/
=======
router.get('/dashboard', dashboardController.getDashboard)
router.get('/dashboard/:page', dashboardController.getDashboard)
>>>>>>> f12318b6d986f9901e314b887b84945214a07eae
    //req.params.page


module.exports = router;

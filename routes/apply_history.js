//==== dashboard route set up ====//

//require modules
//const path = require('path');
const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/apply_history');

//get the router from correct path
/*router.get('/dashboard', function (req, res){
    res.send('test');
});*/

//http://localhost:4000/

router.get('/apply_history', dashboardController.getApplyHistory)
router.get('/apply_history/:page', dashboardController.getApplyHistory)
    //req.params.page


module.exports = router;

//==== dashboard route set up ====//

//require modules
//const path = require('path');
const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/jobs_bookmarks');

//get the router from correct path
/*router.get('/dashboard', function (req, res){
    res.send('test');
});*/

//http://localhost:4000/

router.get('/jobs_bookmarks', dashboardController.getJobsBookmark)
router.get('/jobs_bookmarks/:page', dashboardController.getJobsBookmark)
    //req.params.page


module.exports = router;

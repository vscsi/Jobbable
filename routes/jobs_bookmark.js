//==== dashboard route set up ====//

//require modules
const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/jobs_bookmarks');

//get jobs bookmarks
router.get('/jobs_bookmarks', dashboardController.getJobsBookmark)
router.get('/jobs_bookmarks/:page', dashboardController.getJobsBookmark)


module.exports = router;

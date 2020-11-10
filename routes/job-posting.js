//==== Profile router set up ====//


const express = require('express');
const router = express.Router();


//require controller
const jobPostController = require('../controllers/job-posting');

//get job post
router.get('/job_post', jobPostController.getJobPost)

//post job post
router.post('/job_post', jobPostController.postJobPost)

module.exports = router;

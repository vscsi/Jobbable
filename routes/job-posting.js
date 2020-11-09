//==== Profile router set up ====//


const express = require('express');
const router = express.Router();


//require controller
const jobPostController = require('../controllers/job-posting');

router.get('/job_post', jobPostController.getJobPost)
router.post('/job_post', jobPostController.postJobPost)

module.exports = router;

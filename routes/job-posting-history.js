//==== Profile router set up ====//
const express = require('express');
const router = express.Router();


//require controller
const jobHistoryController = require('../controllers/job-posting-history');


//get job history
router.get('/job_posting_history', jobHistoryController.getJobHist)

//post route for delete job
router.post('/er-delete-job', jobHistoryController.postDeleteJob)

module.exports = router;

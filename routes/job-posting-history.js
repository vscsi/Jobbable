//==== Profile router set up ====//


const express = require('express');
const router = express.Router();


//require controller
const jobHistoryController = require('../controllers/job-posting-history');

router.get('/job_posting_history', jobHistoryController.getJobHist)
router.post('/job_posting_history', jobHistoryController.postJobHist)

module.exports = router;

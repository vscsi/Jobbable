//==== Routers set up ====//

//require modules
const path = require('path');
const express = require('express');
const router = express.Router();

const applyController = require('../controllers/apply_jobs')

//get the router from correct path
router.get('/apply_jobs', applyController.getApplyJobs);
router.post('/apply_jobs', applyController.postApplyJobs);

module.exports = router;
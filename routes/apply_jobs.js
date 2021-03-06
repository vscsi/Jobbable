//==== Routers set up ====//

//require modules
const express = require('express');
const router = express.Router();

const applyController = require('../controllers/apply_jobs')


//POST getting the jobs id
router.post('/apply/loggedin', applyController.postApplyLoggedIn);




//get the router from correct path
router.get('/apply_jobs', applyController.getApplyJobs);

//post to apply history
router.post('/apply_jobs', applyController.postCheckApply)
router.post('/apply_jobs', applyController.postApplyNotify);




module.exports = router;
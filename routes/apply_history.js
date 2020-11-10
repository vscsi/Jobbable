//==== dashboard route set up ====//

//require modules
const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/apply_history');

//get apply history
router.get('/apply_history', dashboardController.getApplyHistory)
router.get('/apply_history/:page', dashboardController.getApplyHistory)


module.exports = router;

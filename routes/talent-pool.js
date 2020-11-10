//==== dashboard route set up ====//

//require modules
//const path = require('path');
const express = require('express');
const router = express.Router();

const talentController = require('../controllers/talent_pool');


//get talent pool
router.get('/talent_pool', talentController.getTalentPool)
router.get('/talent_pool/:page', talentController.getTalentPool)


module.exports = router;

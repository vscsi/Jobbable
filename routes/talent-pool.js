//==== dashboard route set up ====//

//require modules
//const path = require('path');
const express = require('express');
const router = express.Router();

const talentController = require('../controllers/talent_pool');

//get the router from correct path
/*router.get('/dashboard', function (req, res){
    res.send('test');
});*/

//http://localhost:4000/

router.get('/talent_pool', talentController.getTalentPool)
router.get('/talent_pool/:page', talentController.getTalentPool)
    //req.params.page


module.exports = router;

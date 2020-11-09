//==== Profile router set up ====//


const express = require('express');
const router = express.Router();


//require controller
const profileController = require('../controllers/profile');



router.get('/profile', profileController.getProfile)



//delete skilltags
router.post('/profile/delete', profileController.postDeleteSkills)





//add skilltags
router.post('/profile', profileController.postCheckSkills)
router.post('/profile', profileController.postSkills)




module.exports = router;

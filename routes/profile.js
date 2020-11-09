//==== Profile router set up ====//


const express = require('express');
const router = express.Router();


//require controller
const profileController = require('../controllers/profile');



router.get('/profile', profileController.getProfile)

router.post('/profile', profileController.postSkills)

// router.post(`/profile?delete=:`, profileController.postDeleteSkills)


module.exports = router;

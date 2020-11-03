//==== Register router set up ====//

//require modules
const path = require('path');
const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');

//get
router.get('/register', registerController.getRegister)

//post
router.post('/register', registerController.postRegister)

module.exports = router;

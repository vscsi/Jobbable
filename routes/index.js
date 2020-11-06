//==== Routers set up ====//

//require modules
const path = require('path');
const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');




//get the router from correct path
router.get('/', indexController.getIndex)
router.post('/', indexController.postIndex)
module.exports = router;
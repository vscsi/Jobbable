//==== Routers set up ====//

//require modules
// const path = require('path');
const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const { getDashboard } = require('../controllers/dashboard');



//get the router from correct path
router.get('/', indexController.getIndex)
router.get('/home', indexController.getIndex)
router.get('/home/:page', indexController.getIndex)

router.post('/', indexController.postIndex)
router.post('/home', indexController.postIndex)

module.exports = router;
//==== Routers set up ====//

//require modules
const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');



//get the router from correct path
router.get('/', indexController.getIndex)

//post for search
router.post('/', indexController.postIndex)

module.exports = router;
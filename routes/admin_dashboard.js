//==== Routers set up ====//

//require modules
const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_dashboard');

//get the router from correct path
router.get('/dashboard', adminController.getAdmin)

module.exports = router;
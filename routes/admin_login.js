//==== Routers set up ====//

//require modules
const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_login');



//get the router from correct path
router.get('/admin_login', adminController.getAdminLogin)
router.post('/admin_login', adminController.checkAdmin, adminController.postAdminLogin)


module.exports = router;
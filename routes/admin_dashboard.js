//==== Routers set up ====//

//require modules
const express = require('express');
const router = express.Router();

const adminDashboardController = require('../controllers/admin_dashboard');

//get the router from correct path
router.get('/admin_dashboard', adminDashboardController.getAdmin);
router.get('/admin_delete_jobs', adminDashboardController.getAdminDeleteJobs);
router.get('/admin_delete_roles', adminDashboardController.getAdminDeleteRoles);

//post 
router.post('/admin_dashboard', adminDashboardController.postAdmin);
router.post('/admin_delete_jobs', adminDashboardController.postAdminDeleteJobs);
router.post('/admin_delete_roles', adminDashboardController.postAdminDeleteRoles);

module.exports = router;
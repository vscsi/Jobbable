//==== dashboard route set up ====//

//require modules
const express = require('express');
const router = express.Router();

const jobsBookmarkController = require('../controllers/jobs_bookmarks');

//get jobs bookmarks
router.get('/jobs_bookmarks', jobsBookmarkController.getJobsBookmark)
router.get('/jobs_bookmarks/:page', jobsBookmarkController.getJobsBookmark)

//post bookmark a job
router.post('/addBookmark', jobsBookmarkController.postCheckBookmark)
router.post('/addBookmark', jobsBookmarkController.postAddBookmark)

//post route for delete bookmark
router.post('/delete-bookmark', jobsBookmarkController.postDeleteBookmark)


module.exports = router;

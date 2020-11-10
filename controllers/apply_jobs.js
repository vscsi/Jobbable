const knex = require('../models/knex');
//passport middleware
// exports.checkIndexAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return res.redirect('/dashboard')
//     }
//     // console.log(`${req} yoyoyo2`)
//     next();
// }


//routes
exports.getApplyJobs = async (req, res, next) => {
  res.render('users/apply-jobs',{
    pageTitle: 'Apply jobs'
  })

}

exports.postApplyJobs = async (req, res, next) => {
}
const knex = require('../models/knex');

exports.getAdminLogin = async (req, res, next) => {
  res.render('users/admin-login',{
    pageTitle: 'Admin Login'
  })
}


//this checks if the skills exists
exports.postAdminLogin = async (req, res, next) => {

}

const knex = require('../models/knex');

//Admin login middleware
//write a middleware checking whether the user is still logged in 

exports.checkAdmin = async (req,res,next)=>{
  let{adminUsername, adminPassword}=req.body;
  let getAdmin = await knex('admin').where({
    'username':adminUsername,
    'password':adminPassword
  }).select('*');

  console.log(getAdmin)

  try{
    if(getAdmin[0].username === adminUsername && getAdmin[0].password === adminPassword){
      next();
    }
    else{
      res.render('admin/admin-login',{
        pageTitle: 'Admin Login',
        error: 'Credentials are not correct, please try again'
      })
    }
  }
  catch{
    res.render('admin/admin-login',{
      pageTitle: 'Admin Login',
      error: 'Credentials are not correct, please try again'
    })
  }
}

exports.postAdminLogin = async (req,res,next)=>{
  res.render('admin/admin-dashboard',{
    pageTitle: 'Admin dashboard',
  })
}


exports.getAdminLogin = (req, res, next) => {
  res.render('admin/admin-login',{
    pageTitle: 'Admin Login',
    error: ''
  })
}

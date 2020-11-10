const knex = require('../models/knex');


exports.postApplyLoggedIn = async (req, res, next) => {
  let {
    applyButton
  } = req.body

  console.log(req.body)
  console.log(applyButton, `fuckyouuuuuuu`)

  res.render('users/apply-jobs', {
    pageTitle: 'Apply jobs',
    jobsId: applyButton
  })


}






//routes
exports.getApplyJobs = async (req, res, next) => {
  let {
    applyButton
  } = req.body
  console.log(applyButton, `DIUUUUUUU`)


  res.render('users/apply-jobs', {
    pageTitle: 'Apply jobs',
    jobsId: applyButton
  })

}



exports.postCheckApply = async (req, res, next) => {

  let {
    jobsid
  } = req.body

  console.log(req.user.id)

  let check = await knex('apply_history').select(1).where({
    jobs_id: `${jobsid}`,
    employees_id: `${req.user.id}`
  })


  if (check.length > 0) {
    //reload the profile page
    res.redirect('back')
  } else {
    next()
  }

}

exports.postApplyNotify = async (req, res, next) => {

  await knex('apply_history')
    .insert({
      jobs_id: `${jobsid}`,
      employees_id: `${req.user.id}`
    });


  res.redirect('users/applied-history')

}



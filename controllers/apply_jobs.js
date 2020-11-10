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

  console.log(`CHECKINGGGGGGGGGGGGGGGGGG`)

  let check = await knex('apply_history').select(1).where({
    jobs_id: `${jobsid}`,
    employees_id: `${req.user.id}`
  })


  if (check.length > 0) {
    //reload the profile page
    res.render('users/apply-jobs-already-exist', {
      pageTitle: 'Apply Jobs',
    })
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


  let query = await knex.from('apply_history').select().where('employees_id', `${req.user.id}`);
  console.log(query, `testapplyhistory`)

  let jobsId = [];

  for (let i = 0; i < query.length; i++) {
    jobsId.push(query[i].jobs_id)
  }

  let jobQueries;

  let jobQueriesArr = []

  for (let j = 0; j < jobsId.length; j++) {
    jobQueries = await knex('jobs').select().where('id', `${jobsId[j]}`)

    jobQueriesArr.push(jobQueries[0])
  }

  console.log(jobQueriesArr)


  res.render('users/applied-history', {
    pageTitle: 'Applied History',
    pageHeader: 'Applied History',
    path: '/',
    jobQueries: jobQueriesArr
  })

}
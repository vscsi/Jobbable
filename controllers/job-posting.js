const knex = require('../models/knex');


//routes
exports.getJobPost = async (req, res, next) => {
  res.render('users/job-posting', {
    pageTitle: 'Job posting'
  })
}

exports.postJobPost = async (req, res, next) => {
  try {
    let {
      nameCompany,
      nameTitle,
      nameLocation,
      nameUrl,
      nameJob_type,
      nameDescription,
      nameCompany_logo,
      nameHow_to_apply,
    } = req.body;

    let userId = req.user.id;

    let insertJobs = await knex('jobs').returning('id').insert({
      company: `${nameCompany}`,
      title: `${nameTitle}`,
      location: `${nameLocation}`,
      url: `${nameUrl}`,
      job_type: `${nameJob_type}`,
      description: `${nameDescription}`,
      company_logo: `${nameCompany_logo}`,
      how_to_apply: `${nameHow_to_apply}`,
      status: 'true'
    });


    console.log(insertJobs.id, 'This is id of Jobs')

    await knex('employers_job_listings').insert({
      employers_id: `${userId}`,
      jobs_id: `${insertJobs[0]}`
    })

  } finally {

    let query = await knex.from('employers_job_listings').select().where('employers_id', `${req.user.id}`);
    console.log(query, `FUCKKKKKKKK`)

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



    res.render('users/job-posting-history', {
      pageTitle: 'Job posting',
      jobQueries: jobQueriesArr
    })
  }

}

const knex = require('../models/knex');


exports.getJobHist = async (req, res, next) => {
    let query = await knex.from('employers_job_listings').select().where('employers_id', `${req.user.id}`);

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

    res.render('users/job-posting-history', {
        pageTitle: 'Job posting',
        jobQueries: jobQueriesArr
    })

}

exports.postDeleteJob = async (req, res, next) => {
    let {
        jobid
    } = req.body

    await knex.from('jobs_skilltag').select().where('jobs_id', jobid).del()
    await knex.from('apply_history').select().where('jobs_id', jobid).del()
    await knex.from('jobs_bookmarks').select().where('jobs_id', jobid).del()
    await knex.from('employers_job_listings').select().where('jobs_id', jobid).del()
    await knex.from('jobs').select().where('id', jobid).del()
    
    res.redirect('back')

}
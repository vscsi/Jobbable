const knex = require('../models/knex');

exports.getJobsBookmark = async (req, res, next) => {

    let query = await knex.from('jobs_bookmarks').select().where('employee_id', `${req.user.id}`);
    console.log(query, `testjobsbookmark`)

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


    res.render('users/jobs_bookmarks', {
        pageTitle: 'Jobs Bookmark',
        pageHeader: 'Jobs Bookmark',
        path: '/',
        jobQueries: jobQueriesArr
    })
}
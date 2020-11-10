const knex = require('../models/knex');



//routes
exports.getApplyHistory = async (req, res, next) => {

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

    res.render('users/applied-history', {
        pageTitle: 'Applied History',
        pageHeader: 'Applied History',
        path: '/',
        jobQueries: jobQueriesArr
    })
}
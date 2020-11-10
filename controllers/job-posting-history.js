const knex = require('../models/knex');


//routes

exports.getJobHist = async (req, res, next) => {
    // console.log(req.user.id, 'this is user id')
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


    // console.log(query.employers_id, 'this is employers id');
    // console.log(jobQuery.company, 'this is respective jobs');

    res.render('users/job-posting-history', {
        pageTitle: 'Job posting',
        jobQueries: jobQueriesArr
    })

}

exports.postJobHist = async (req, res, next) => {

}

// insert into jobs table , retrieve id of new jobs , 
// use id of new jobs insert jobs id and employers id to employers job listings
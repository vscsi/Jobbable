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
        jobQueries: jobQueriesArr
    })
}

exports.postCheckBookmark = async (req, res, next) => {
    let {
        bookmarkButton
    } = req.body

    console.log(bookmarkButton, `CHECKING BOOKMARK`)

    let check = await knex('jobs_bookmarks').select(1).where({
        jobs_id: `${bookmarkButton}`,
        employee_id: `${req.user.id}`
    })

    if (check.length > 0) {
        //reload the profile page
        res.render('users/already-exist', {
            pageTitle: 'Apply Jobs',
            message: 'You already bookmark for this job!'
        })
    } else {
        next()
    }
}


exports.postAddBookmark = async (req, res, next) => {
    let {
        bookmarkButton
    } = req.body

    console.log(bookmarkButton, `ADDING BOOKMARK`)

    await knex('jobs_bookmarks')
        .insert({
            jobs_id: `${bookmarkButton}`,
            employee_id: `${req.user.id}`
        });

    let query = await knex.from('jobs_bookmarks').select().where('employee_id', `${req.user.id}`);

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



    res.render('users/jobs_bookmarks', {
        pageTitle: 'Jobs Bookmark',
        pageHeader: 'Jobs Bookmark',
        jobQueries: jobQueriesArr
    })


}

exports.postDeleteBookmark = async (req, res, next) => {
    let {
        jobid
    } = req.body


    await knex.from('jobs_bookmarks').select().where('jobs_id', jobid).del()

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
        jobQueries: jobQueriesArr
    })

}
const knex = require('../models/knex');

exports.getAdmin = async(req, res, next) => {

    res.render('admin/admin-dashboard', {
        pageTitle: 'Admin Dashboard',
    })
}

exports.getAdminDeleteJobs = async(req, res, next) => {
    let jobQueries = await knex.from('jobs').select().orderBy('status', 'desc');

    res.render('users/admin-delete-jobs', {
        pageTitle: 'Delete jobs',
        jobQueries: jobQueries,
    })
}

exports.getAdminDeleteRoles = async(req, res, next) => {
    res.render('users/admin-delete-roles', {
        pageTitle: 'Delete Employers/Employees'
    })
}

exports.postAdminDeleteJobs = async(req, res, next) => {
    //delete from jobs, jobs_skilltag, employers job listings, apply history, jobs bookmark
    let {
        nameJobsId
    } = req.body
    await knex.from('jobs_skilltag').select().where('jobs_id', nameJobsId).del()
    await knex.from('apply_history').select().where('jobs_id', nameJobsId).del()
    await knex.from('jobs_bookmarks').select().where('jobs_id', nameJobsId).del()
    await knex.from('employers_job_listings').select().where('jobs_id', nameJobsId).del()
    await knex.from('jobs').select().where('id', nameJobsId).del()
    res.redirect('back')
}

exports.postAdminDeleteRoles = async(req, res, next) => {
    let { adminStatusSelect } = req.body;
    let adminStatusSelectArr = []
    if (adminStatusSelect == 'employer') {
        let query = await knex('employers').select().where('status', adminStatusSelect);
        adminStatusSelectArr.push(query);
    } else {
        let query = await knex('employees').select().where('status', adminStatusSelect);
        adminStatusSelectArr.push(query);
    }
    console.log(adminStatusSelectArr);
    res.render('users/admin-delete-roles', {
        pageTitle: 'Delete Employers/Employees',
    })
}


exports.postAdmin = async(req, res, next) => {
    res.render('admin/admin-dashboard', {
        pageTitle: 'Admin Dashboard'
    })

}

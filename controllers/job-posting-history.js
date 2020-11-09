const knex = require('../models/knex');


//routes
exports.getJobHist = async(req, res, next) => {
        // console.log(req.user.id, 'this is user id')
        let query = await knex.from('employers_job_listings').select('*').where('id',`${req.user.id}`);
        let jobQueries = await knex('jobs').select('*').where('id',`${query.employers_id}`)
        console.log(query.employers_id,'this is employers id');
        console.log(jobQuery.company,'this is respective jobs');

        res.render('users/job-posting-history', {
            pageTitle: 'Job posting',
            jobQueries: jobQueries 
        })
    
}

exports.postJobHist = async(req, res, next) => {

}

// insert into jobs table , retrieve id of new jobs , 
// use id of new jobs insert jobs id and employers id to employers job listings
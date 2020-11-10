const knex = require('../models/knex');


//routes
exports.getJobPost = async(req, res, next) => {
  // console.log(req.user.username)
    res.render('users/job-posting', {
        pageTitle: 'Job posting'
    })
}

exports.postJobPost = async(req, res, next) => {
  try{
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
    // console.log(req.user)
    // console.log(userId, 'This is user Id');

    let insertJobs = await knex('jobs').returning('id').insert(
            { company: `${nameCompany}` ,
             title: `${nameTitle}` ,
             location: `${nameLocation}` ,
             url: `${nameUrl}` ,
             job_type: `${nameJob_type}` ,
             description: `${nameDescription}` ,
             company_logo: `${nameCompany_logo}` ,
             how_to_apply: `${nameHow_to_apply}` ,
            status: 'true'}
    );
    
    console.log(insertJobs.id, 'This is id of Jobs')
    await knex('employers_job_listings').insert(
        {
        employers_id: `${userId}`,
        jobs_id: `${insertJobs.id}`
      }
    )

  }
  catch(err){
    console.log(err);
    res.send('Sorry job posting failed, please go back!')
  }
  finally{
    res.redirect('back')
  }
    
}

// insert into jobs table , 
//insert jobs id and employers id to employers job listings
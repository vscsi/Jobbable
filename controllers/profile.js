const knex = require('../models/knex');



exports.getProfile = async (req, res, next) => {


    //query for getting employee's skilltag and render them out for ejs
    let getSkilltag = await knex('employee_skilltag')
    .join('skilltag', 'employee_skilltag.skilltag_id', 'skilltag.id')
    .select('employee_skilltag.employees_id', 'employee_skilltag.skilltag_id', 'skilltag.skilltag_name')
    .where('employees_id', `${req.user.id}`);
    
    console.log(getSkilltag, 'FUCKYOU')

    res.render('users/profile', {
        pageTitle: 'Dashboard > Employees',
        pageHeader: 'Edit your skills',
        skilltags: getSkilltag
    });
}

exports.postSkills = async (req, res, next)=>{

    // get the value from the form for knex query
    let {profileSelect} = req.body;

    //query for inserting employees' id and the relevant skilltag id 
    //into the join table ->employee_skilltag
    await knex('employee_skilltag')
    .insert({employees_id: `${req.user.id}`, skilltag_id: `${profileSelect}`});

    //reload the profile page
    res.redirect('back')

}

// exports.postDeleteSkills = async(req, res,next)=>{
//     console.log(req.params)
    

//     res.render('users/profile', {
//         pageTitle: 'Dashboard > Employees',
//         pageHeader: 'Edit your skills',

//     })
// }


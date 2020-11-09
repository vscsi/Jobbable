const knex = require('../models/knex');



exports.getProfile = async (req, res, next) => {
    let username = req.user.username


    //query for getting employee's skilltag and render them out for ejs
    let getSkilltag = await knex('employee_skilltag')
        .join('skilltag', 'employee_skilltag.skilltag_id', 'skilltag.id')
        .select('employee_skilltag.employees_id', 'employee_skilltag.skilltag_id', 'skilltag.skilltag_name')
        .where('employees_id', `${req.user.id}`);

    res.render('users/profile', {
        pageTitle: 'Dashboard > Employees',
        pageHeader: 'Edit your skills',
        skilltags: getSkilltag,
        username: username
    });
}


//this checks if the skills exists
exports.postCheckSkills = async (req, res, next) => {

    // get the value from the form for knex query
    let {profileSelect} = req.body;

    let check = await knex('employee_skilltag').select('1').where({
        employees_id: `${req.user.id}`,
        skilltag_id: `${profileSelect}`
    });

    console.log(check, `FUCKING FUCK`)

    if (check.length > 0) {
        //reload the profile page
        res.redirect('back')
    } else {
        next()
    }

}



//this will add the skills only if the skills doesn't exist
exports.postSkills = async (req, res, next) => {
    let {
        profileSelect
    } = req.body;

    //query for inserting employees' id and the relevant skilltag id 
    //into the join table ->employee_skilltag
    await knex('employee_skilltag')
        .insert({
            employees_id: `${req.user.id}`,
            skilltag_id: `${profileSelect}`
        });

    //reload the profile page
    res.redirect('back')

}

//this checks if the skills exists
exports.postdeleteCheckSkills = async (req, res, next) => {
    // get the value from the form for knex query
    let {
        skillDelete
    } = req.body;

    let check = await knex('employee_skilltag').select('1').where({
        employees_id: `${req.user.id}`,
        skilltag_id: `${skillDelete}`});

    console.log(check, `FUCKING FUCK`)

    if (check.length == 0) {
        //reload the profile page
        res.redirect('back')
    } else {
        next()
    }


}



exports.postDeleteSkills = async (req, res, next) => {
    let {
        skillDelete
    } = req.body;

    //query for inserting employees' id and the relevant skilltag id 
    //into the join table ->employee_skilltag
    await knex('employee_skilltag')
        .where({
            employees_id: `${req.user.id}`,
            skilltag_id: `${skillDelete}`})
        .del();

    //reload the profile page
    res.redirect('back')
}
// ===================== 
//     talent_pool       
// ===================== 

const knex = require('../models/knex');




exports.getTalentPool = async (req, res, next) => {

    // 1) [what jobs does this employers have posted]

    //  select * from employers_job_listings where employers_id = 2;

    let whatJobs = await knex('employers_job_listings').select().where('employers_id', `${req.user.id}`);

    // console.log(whatJobs, `HAVE WHAT JOBS AH`)


    // 2)
    // [should have an array of jobs that they have]
    // [now using the jobs_id from this result, find from apply history who has applied for their job]


    //let's say we know now that the this employers has two jobs, 1 and 2
    // select * from apply_history where jobs_id=1 or jobs_id=2;
    //as we dunno if the employers have posted one or more jobs we can't query in one go, we need to for loop the number

    let queryApplyHistory;

    let whoApplied = []

    for (let i = 0; i < whatJobs.length; i++) {

        queryApplyHistory = await knex('apply_history').select().where('jobs_id', `${whatJobs[i].jobs_id}`);

        for (let j = 0; j < queryApplyHistory.length; j++) {

            whoApplied.push(queryApplyHistory[j])

        }

    }


    console.log(whoApplied, `WHO THE APPLIED`)


    let theJobs, theFirstNames, theLastNames, theSkills;

    let theJobsArr = [];
    let theFirstNamesArr = [];
    let theLastNamesArr = [];
    let theSkillsArr = [];
    let temp =[];

    for (let a = 0; a < whoApplied.length; a++) {


        theJobs = await knex('jobs').select('title').where('id', `${whoApplied[a].jobs_id}`);

        theJobsArr.push(theJobs[0])

        theFirstNames = await knex('employees').select('first_name').where('id', `${whoApplied[a].employees_id}`)

        theFirstNamesArr.push(theFirstNames[0])

        theLastNames = await knex('employees').select('last_name').where('id', `${whoApplied[a].employees_id}`)

        theLastNamesArr.push(theLastNames[0])

        theSkills = await knex('skilltag')
            .join('employee_skilltag', 'employee_skilltag.skilltag_id', 'skilltag.id')
            .select('skilltag.skilltag_name')
            .where('employees_id', `${whoApplied[a].employees_id}`);

        for(let j=0; j<theSkills.length; j++){
            temp.push(theSkills[j].skilltag_name)
        }
        theSkillsArr.push(temp)
        temp=[];


    }

    let applyhistoryArr = []
    let applyhistoryObj = {jobs:'', firstname:'', lastname:'', skills: []}

    for(let i=0; i<theJobsArr.length; i++){

        applyhistoryObj.jobs = theJobsArr[i].title;
        applyhistoryObj.firstname = theFirstNamesArr[i].first_name;
        applyhistoryObj.lastname = theLastNamesArr[i].last_name;
        applyhistoryObj.skills = theSkillsArr[i]

        applyhistoryArr.push(applyhistoryObj)

        applyhistoryObj = {jobs:'', firstname:'', lastname:'', skills: []}

    }

    res.render('users/talent-pool', {
        pageTitle: 'Talent Pool',
        pageHeader: 'Talent Pool',
        applyHistory: applyhistoryArr

    });


}
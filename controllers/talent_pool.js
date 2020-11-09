const pg = require('pg');
const { pool } = require('../models/database');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "jobbable",
        user: "postgres",
        password: "postgres"
    }
});


exports.getTalentPool = async(req,res,next)=>{
        console.log(req.user.id)

                    res.render('users/talent-pool', {
                        pageTitle: 'Talent Pool',
                        pageHeader: 'Talent Pool',
                    });
}



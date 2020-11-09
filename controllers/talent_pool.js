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

const user_role = 2;
const page_limit = 10;

exports.getTalentPool = async(req,res,next)=>{
        console.log('user role 2')

                    res.render('users/talent-pool', {
                        pageTitle: 'Talent Pool',
                        pageHeader: 'Talent Pool',
                    });
}



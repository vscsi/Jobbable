const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../models/database')
const bcrypt = require('bcrypt');

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "jobbable",
        user: "postgres",
        password: "postgres"
    }
});

//initialize a local strategy
function initialize(passport) {
    //req param is passed from passReqtoCallback in strategy config
    const authenticateUser = async(username, password, done) => {
       
            console.log(username)
            let employersQuery = await knex.select('password', 'id', 'status', 'username').from('employers').where('username', `${username}`);
            let employeesQuery = await knex.select('password', 'id', 'status', 'username').from('employees').where('username', `${username}`);
            console.log(`This is employersQuery ${employersQuery}`)
            console.log(`This is employeesQuery ${employeesQuery}`)
            // console.log(typeof employersQuery)
            let user;
            employersQuery == '' ? user=employeesQuery[0] :user=employersQuery[0];
            console.log(`This is user status: ${user.status}`)
            console.log(`This is user username: ${user.username}`)
            console.log(`This is user id: ${user.id}`)
        

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    console.log(`${user.password} >>>>>${user.username} ${user.status} Authenticated`)
                    return done(null, user)
                } else {
                    console.log(`${user.password} ${user.username} ${user.status} not auth`)
                    return done(null, false, { message: "Password is not correct" })
                }
            })

        }
    
    passport.use(
        new LocalStrategy({
                //change the default authentication units: username and password to other parameters
                usernameField: 'username',
                passwordField: 'password',
                // passReqToCallback:true //it adds req param to authenticateUser
            },
            authenticateUser
        )
    )

    passport.serializeUser((user, done) =>
        done(null, user.id));

    passport.deserializeUser(async(id, done) => {
        // console.log(id)
        let employeesIdQuery = await knex.select('*').from('employees').where('id', `${id}`);
        let employersIdQuery = await knex.select('*').from('employers').where('id', `${id}`);
        if (employeesIdQuery == '') {
            return done(null, employersIdQuery[0])

        } else {
            return done(null, employeesIdQuery[0])
        }
    })

}

module.exports = initialize
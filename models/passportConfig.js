
// passportCOnfig js
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
 
        try {
            let employersQuery = await knex.select('password', 'id', 'status', 'username').from('employers').where('username', `${username}`);
            let employeesQuery = await knex.select('password', 'id', 'status', 'username').from('employees').where('username', `${username}`);
 
            // console.log(`This is employersQuery ${employersQuery}`)
            // console.log(`This is employeesQuery ${employeesQuery}`)
            // console.log(`${req} ${req.body.id} ${req.body.rows} ${req.body.status} this is user status`)
            // console.log(typeof employersQuery)
            let user;
            if(employeesQuery == '' && employersQuery == ''){
                console.log("console log Credentials are not correct")
                return done(null, false, { message: "Credentials are not correct" })
            }
            employersQuery == '' ? user = employeesQuery[0] : user = employersQuery[0];
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
                    return done(null, false, { messages: "Password is not correct" })
                }
            })
 
        } catch(err) {
            return done(err);
        }
 
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
        done(null, user.username));
 
    passport.deserializeUser(async(username, done) => {
        let employeesIdQuery = await knex.select('*').from('employees').where('username', `${username}`);
        let employersIdQuery = await knex.select('*').from('employers').where('username', `${username}`);
        // console.log(username)
        // console.log(employeesIdQuery, 'this is employeesIdquery')
        // console.log(employersIdQuery, 'this is employersIdquery')
        
        if (employeesIdQuery == '') {
            return done(null, employersIdQuery[0])
 
        } else {
            return done(null, employeesIdQuery[0])
        }
    })
 
}
 
module.exports = initialize

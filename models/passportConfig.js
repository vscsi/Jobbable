const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../models/database')
const bcrypt = require('bcrypt');

//initialize a local strategy
function initialize(passport) {
    //req param is passed from passReqtoCallback in strategy config
    const authenticateUser = (role, username, password, done) => {
        // console.log(role)
        pool.query(
            `select 1 
            from (
                select username as username from employees 
                union all
                select username from employers    
            ) a
            where username = $1`, [role, username], (err, results) => {
                if (err) {
                    console.log(err)
                }
                console.log(results.rows)
                    //finding user in DB
                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            console.log(`${user.password} >>>>>${user.username} yoyoyo4`)
                            return done(null, user)
                        } else {
                            console.log(`${user.password} ${user.username} yoyoyo5`)
                            return done(null, false,  {message: "Password is not correct"} )
                        }
                    })
                } else { //if there are no users
                    return done(null, false, {message: "Username is not registered"})
                }
            }
        )
    };

    passport.use(
        new LocalStrategy({
                //change the default authentication units: username and password to other parameters
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback:true //it adds req param to authenticateUser
            },
            authenticateUser
        )
    )

    passport.serializeUser((user, done) =>
        done(null, user.id));
       
    passport.deserializeUser((id, done) => {
        pool.query(
            `select * from employees where id = $1`, [id], (err, result) => {
                if (err) {
                    throw error
                }
                return done(null, result.rows[0]);
            }
        )
    })

}

module.exports = initialize
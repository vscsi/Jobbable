const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../models/database')
const bcrypt = require('bcrypt');

//initialize a local strategy
function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        pool.query(
            `select * from employees where username=$1`, [username], (err, results) => {
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
                            return done(null, false, { message: "Password is not correct" })
                        }
                    })
                } else { //if there are no users
                    return done(null, false, { message: "Username is not registered" })
                }
            }
        )
    };

    passport.use(
        new LocalStrategy({
                //change the default authentication units: username and password to other parameters
                usernameField: 'username',
                passportField: 'password'
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
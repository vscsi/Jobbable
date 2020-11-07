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
            let employersQuery = await knex.select('password', 'id', 'status').from('employers').where('username', `${username}`);
            let employeesQuery = await knex.select('password', 'id', 'status').from('employees').where('username', `${username}`);
            console.log(employersQuery)
            if (employersQuery.length > 0) {
                const user = employersQuery[0]
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
                    }
                )

                    // employersQuery.then((rows)=>{
                    //     if(rows.length>0){
                    //         const user = rows[0];
                    //         bcrypt.compare(password, user.password, (err, isMatch) => {
                    //             if (err) {
                    //                 throw err;
                    //             }
                    //             if (isMatch) {
                    //                 console.log(`${user.password} >>>>>${user.username} yoyoyo4`)
                    //                 return done(null, user)
                    //             } else {
                    //                 console.log(`${user.password} ${user.username} yoyoyo5`)
                    //                 return done(null, false,  {message: "Password is not correct"} )
                    //             }
                    //         }) 
                    //     }else{
                    //         employeesQuery.then((rows)=>{
                    //             console.log(rows)
                    //             if(rows.length>0){
                    //                 const user = rows[0];
                    //                 bcrypt.compare(password, user.password, (err, isMatch) => {
                    //                     if (err) {
                    //                         throw err;
                    //                     }
                    //                     if (isMatch) {
                    //                         console.log(`${user.password} >>>>>${user.username} yoyoyo4`)
                    //                         return done(null, user)
                    //                     } else {
                    //                         console.log(`${user.password} ${user.username} yoyoyo5`)
                    //                         return done(null, false,  {message: "Password is not correct"} )
                    //                     }
                    //                 }) 
                    //             }else{
                    //                 return done(null, false, {message: "Username is not registered"})
                    //             }
                    //         })
                    //     }
                    // })

                
            }}

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

                passport.deserializeUser((id, done) => {
                    if (user.status == 'employee') {
                        // pool.query(
                        //     `select * from employees where id = $1`, [id], (err, result) => {
                        //         if (err) {
                        //             throw error
                        //         }
                        //         console.log(results.row)
                        //         return done(null, result.rows[0]);
                        //     }
                        //     )

                        let query = knex.select('*').from('employees').where('id', `${id}`);
                        query.then((rows) => {
                            console.log(rows)
                            return done(null, rows.id)
                        }).catch((err) => {
                            throw err
                        })

                    } else {
                        //     pool.query(
                        //         `select * from employers where id = $1`, [id], (err, result) => {
                        //             if (err) {
                        //                 throw error
                        //             }
                        //             console.log(result.rows)
                        //         return done(null, result.rows[0]);
                        //     }
                        // )

                        let query = knex.select('*').from('employers').where('id', `${id}`);
                        query.then((rows) => {
                            console.log(rows)
                            return done(null, rows.id)
                        }).catch((err) => {
                            throw err
                        })


                    }
                })

            }

            module.exports = initialize
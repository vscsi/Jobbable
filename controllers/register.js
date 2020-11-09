//==== Register controller ====//


//Registration pag//Modules requirement

const { pool } = require('../models/database');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: __dirname + '../models/.env' })


exports.getRegister = (req, res, next) => {
    res.render('register/register', {
        pageTitle: 'Sign up',
        path: '/register'
    })
}

exports.postRegister = async(req, res, next) => {
    let {
        firstname,
        lastname,
        username,
        email,
        password,
        password2,
        role,
        businessRegNo,
        coName
    } = req.body;
    
    console.log(`${req.body.firstname} ${req.body.role} ${req.body.businessRegNo} ${req.body.coName}`);

    let errors = [];

    if (!firstname || !lastname || !username || !email || !password || !password2) {
        errors.push({
            message: 'please enter all fields'
        });
    }


    if (!role) {
        errors.push({
            message: 'Please state whether you are an employer or employee for further processing.'
        })
    }

    if(role == 'employer'&&!businessRegNo || role == 'employer'&&!coName  ){
        errors.push({
            message: 'Please input business registration number and company name.'
        })
    }

    if (password.length < 6) {
        errors.push({
            message: 'Password should be at least 6 characters'
        })
    }

    if (password != password2) {
        errors.push({
            message: 'Passwords do not match'
        })
    }

    if (errors.length > 0) {
        res.render('register/register', {
            pageTitle: 'Register',
            path: '/register',
            errors
        });
    } else {
        //form validation has passed
        let hashedPassword = await bcrypt.hash(password, 10);

        //  query database to see if user username already exists in databases

        if (role == 'employee') {
            pool.query(
                `select 1 
                from (
                    select username as username from employees 
                    union all
                    select username from employers    
                ) a
                where username = $1`, [username], (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(results.rows);
                    if (results.rows.length > 0) {
                        errors.push({
                            message: "Username already registered. Please pick a new username."
                        })
                        return res.render("register/register", {
                            pageTitle: 'register',
                            errors
                        });
                    } else { 
                        pool.query(
                            `insert into employees (first_name,last_name,username,email,password,status)
                                        values ($1, $2, $3, $4, $5, $6)
                                        `, [firstname, lastname, username, email, hashedPassword, role],
                            (err, results) => {
            console.log(results)
                                if (err) {
                                    throw err
                                }
                                // console.log(results.rows.password);
                                // req.flash('success_msg','You are now registered. Please log in.')
                                res.redirect('/login');
                            }
                        )
                    }
                }
            )
        } 
       if(role == 'employer'){
            pool.query(
                `select 1 
                from (
                    select username as username from employees 
                    union all
                    select username from employers    
                ) a
                where username = $1`, [username], (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(results.rows);
                    if (results.rows.length > 0) {
                        errors.push({
                            message: "Username already registered. Please pick a new username."
                        })
                        return res.render("register/register", {
                            pageTitle: 'register',
                            errors
                        });
                    } else {
                        pool.query(
                            `insert into employers (first_name,last_name,username,email,password,status,company_name,br_number)
                            values ($1, $2, $3, $4, $5, $6, $7, $8)
                            `, [firstname, lastname, username, email, hashedPassword, role, coName, businessRegNo],
                            (err, results) => {
                                if (err) {
                                    console.error(err)
                                    console.log(`Hiii ${results}`)
                                    throw err
                                }
                                // console.log(results.rows.password);
                                // req.flash('success_msg','You are now registered. Please log in.')
                                res.redirect('/login');
                            }
                        )
                    }
                }
            )

        }
    }

}

//==== Register controller ====//

//Registration page
exports.getRegister = (req, res, next) => {
    res.render('register/register', {
        pageTitle: 'Sign up',
        path: '/register'
    })
}

exports.postRegister = async (req, res, next) => {
    let {
        firstname,
        lastname,
        username,
        email,
        password,
        password2,
        employee,
        employer,
        businessRegNo,
        payment
    } = req.body;

    let errors = [];

    if (!firstname || !lastname || !username || !email || !password || !password2) {
        errors.push({
            message: 'please enter all fields'
        });
    }

    if(!employee && !employer){
        errors.push({
            message: 'Please state whether you are an employer or employee for further processing.'
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
        res.render('./users/register', {
            pageTitle: 'Register',
            errors
        });
    } else {
        
        //form validation has passed
        let hashedPassword = await bcrypt.hash(password, 10);

        //  query database to see if user email already exists in database

        //test
        pool.query(
            `select exists
                (select * from employees where username=$1)`
            
            , [username], (err, results) => {
                if (err) {
                    console.log(err)
                }
                console.log(results.rows);
                if (results.rows.length > 0) {
                    errors.push({
                        message: "Username already registered"
                    })
                    return res.render("./users/register", {
                        pageTitle: 'register',
                        errors
                    });
                } else {
                    pool.query(
                        `insert into employees (first_name,last_name,username,email,password)
                        values ($1, $2, $3, $4, $5)
                        returning id, password`, [firstname, lastname, username, email, hashedPassword],
                        (err, results) => {
                            if (err) {
                                throw err
                            }
                            console.log(results.rows.password);
                            // req.flash('success_msg','You are now registered. Please log in.')
                            res.redirect('/users/login')
                        }
                    )
                }
            }
        )
    }
}
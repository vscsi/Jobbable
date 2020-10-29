
//user dashboard
exports.getUsers = (req, res, next)=>{
    res.render('users/user-dashboard', {
        pageTitle: 'User Dashboard',
        path: '/users/dashboard'
    })
}
//Registration page
exports.getRegister = (req, res, next)=>{
    res.render('users/register', {
        pageTitle: 'Sign up',
        path: '/users/register'
    })
}

//login page
exports.getLogin = (req, res, next)=>{
    res.render('users/login', {
        pageTitle: 'Login',
        path: '/users/login'
    })
}

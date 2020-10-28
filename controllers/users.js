exports.getUsers = (req, res, next)=>{
    res.render('users/user-dashboard', {
        pageTitle: 'User Dashboard',
        path: '/users/dashboard'
    })
}
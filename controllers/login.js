//==== Login controller ====//

/**Middleware */
//Passport local strategy authentication when landing into pages
exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard')
    }
    console.log(`${req} yoyoyo2`)
    next();
}

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


//get
exports.getLogin = (req, res, next) => {
    res.render('users/login', {
        pageTitle: 'Login',
        path: '/login',
        // message: req.user.message
    })
}
//post
exports.postLogin = (req, res, next) => {
    console.log(req.user,username);
}

//logout
exports.getLogout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You have logged out')
    res.redirect('/')
}
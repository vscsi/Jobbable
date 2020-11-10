exports.getAdmin = (req, res, next)=>{
    
    res.render('admin/admin-dashboard', {
        pageTitle: 'Admin Dashboard',
        path: '/admin/dashboard'
    })
}
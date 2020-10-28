exports.getIndex = (req,res,next)=>{
    res.render('index', {
        pageTitle: 'Index Page',
        path: '/'
    });
}
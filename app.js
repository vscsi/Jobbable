//==== server side js ====//

// require needed modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');



// require needed controllers
const errorController = require('./controllers/error');
//routes set up
const indexRoutes = require('./routes/index');
const adminLoginRoutes = require('./routes/admin_login');
const adminDashboardRoutes = require('./routes/admin_dashboard')
const usersRoutes = require('./routes/users');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const talentPoolRoutes = require('./routes/talent-pool')
const applyHistoryRoutes = require('./routes/apply_history');
const profileRoutes = require('./routes/profile');
const jobPostRoutes = require('./routes/job-posting');
const jobHistRoutes = require('./routes/job-posting-history');
const applyJobsRoutes = require('./routes/apply_jobs');
const jobsBookmarkRoutes = require('./routes/jobs_bookmark');

// set up app
const app = express();


// set us template (using ejs)
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

////passport, session set up
//setting initiazlize and sessions from passport
app.use(session({
    //key to keep secret which will encrypt all of our information
    secret: process.env.PASSPORT_SESSION_SECRET,
    //resave the value if something is changed
    resave: false,
    //save empty values if there is no values
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// app.use set up 
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname + '/public')))

app.use(indexRoutes);
app.use(adminLoginRoutes);
app.use(adminDashboardRoutes);
app.use('/users', usersRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(dashboardRoutes);
app.use(applyHistoryRoutes);
app.use(talentPoolRoutes);
app.use(profileRoutes);
app.use(jobPostRoutes);
app.use(jobHistRoutes);
app.use(applyJobsRoutes);
app.use(jobsBookmarkRoutes);

app.use(errorController.get404);

// hosting server
app.listen(4000, ()=>{
    console.log('Listening to port 4000' + path.join(__dirname, 'public'))
})

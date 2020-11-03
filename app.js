//==== server side js ====//

// require needed modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// require needed controllers
const errorController = require('./controllers/error');
//routes set up
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const usersRoutes = require('./routes/users');
const registerRoutes = require('./routes/register');

// set up app
const app = express();


// set us template (using ejs)
app.set('view engine', 'ejs');
app.set('views', 'views');


// app.use set up 
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname + '/public')))

app.use(indexRoutes);
app.use('/admin', adminRoutes);
app.use('/users', usersRoutes);
app.use(registerRoutes);



app.use(errorController.get404);

// hosting server
app.listen(4000, ()=>{
    console.log('Listening to port 4000' + path.join(__dirname, 'public'))
})

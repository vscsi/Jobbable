//==== server side js ====//

// require needed modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// set up app
const app = express();

// require needed controllers
const errorController = require('./controllers/error');

// set us template (using ejs)
app.set('view engine', 'ejs');
app.set('view', 'views');

// app.use set up

app.use(bodyParser.urlencoded({extened:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(errorController.get404);

// hosting server
app.listen(4000, ()=>{
    console.log('Listening to port 4000')
})

//configure doenv
require('dotenv').config();
//require express and setup an express app instance
const Express = require('express');
//require and set view engine use ejs
const ejsLayouts = require('express-ejs-layouts');
//require all middleware for app/authentication
//helmet, morgan, passport, and custom middleware, express-sessions, sequelize sessions, flash
const helmet = require('helmet');
const session = require('express-session');
const flast = require('flash');


//set app to use false urlencoding
// set app to public directory for use
// set app ejslayouts for render

const app = Express();
app.use(Express.urlencoded({extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());


app.get('/', (req, res) => {
    res.render('index');
})

//include auth controller
app.use('/auth', require('./controllers/auth')); // use the auth.js file in the auth folder when dealing with auth routes)

app.listen(process.env.PORT || 3000, function() {
    console.log("Listening to port ${process.env.PORT}");
})
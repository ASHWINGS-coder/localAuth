const express = require('express'); //  using express 

const app = express();

const bcrypt = require('bcrypt'); // access to bcrypt

const db = require('./config/mongoose'); // using mongoose

// used for session  cookie and authetication passport
const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport_config')

const flash = require('connect-flash'); // using flash

const customMware = require('./config/middleware'); // using flash middle ware



// initialising passport library
const initializePassport = require('./config/passport_config')

app.use(express.urlencoded());


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    secret: "blah",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:( 1000*60*100 )
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
app.use(flash()); // using connect-flash
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes/index'));


// listening to app
app.listen(3000,(err) => {
    if(err){
        console.log('error in running server')
    }
    console.log('server is running on port 3000')

})
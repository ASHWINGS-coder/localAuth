const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy; // using local strategy of passport for local Authentication

const User = require('../models/user')

// authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        // find user and establish idenetity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user --> passport')
                return done(err);
            }

            if(!user || user.password != password){
                return console.log('Invalid username password');
                return done(null,false);
            }

            return done(null,user);
        });
    }
));

// searlisoing th euser to decided which key to be kept in cookies
passport.serializeUser((user,done) => { 
    done(null,user.id);
});

// deserializing the key
passport.deserializeUser((id,done) => { 
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> passport')
            return done(err);
        }
        return done(null,user);
    });
});

// check if user is authenticated 
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in the pass on the request to teh next function , controllers action
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 
    return res.redirect('/user/sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;

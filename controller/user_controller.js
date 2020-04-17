const User = require('../models/user')

// exporting profile
module.exports.profile = (req,res) => {
    User.findById(req.params.id,(err,user) => {
        return res.render('profile',{
            title:"User Profile",
            profile_user:user
        })
    })
    return res.render('profile');
}


// exporting sign-in 
module.exports.Signin = (req,res) => {
    if(req.isAuthenticated()){
        res.render('profile');
    }
    req.flash('error' , 'Invalid Username or password')
    return res.render('sign_in');
}

// exporting sign-up
module.exports.Signup = (req,res) => {
        if(req.isAuthenticated()){
            res.render('profile');
        }
    return res.render('sign_up');
}

// creating an entry of user in db if user is not present 
module.exports.create = (req,res) => {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, async function(err, user){
       
        if(err){
            console.log('Error in finding user in siging up',err);
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user while siging up',err);
                    return;
                }
                return res.redirect('/user/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    })
}

// creating a login session for the user 
module.exports.createSession = (req,res) => {
        req.flash('success' , 'Login in successfully')
        return res.redirect('/user/profile');

}


// logout module 
module.exports.destroySession = (req,res) => {
    req.logout();
    req.flash('success' , 'Logged out successfully')
    return res.redirect('/');
}

// rendering page for password change
module.exports.changePassword = (req,res) => {
   return res.render('change-password');
    }

//  password change 
module.exports.passwordChange = (req,res) => {
     User.findOne({email:req.body.email},(err,user) => {
         if(err){
             console.log(err)
         }

         if(user){
             if(user.password == req.body.old_password){
             User.updateOne({ _id : req.params.id},{
              $set :{
                        password : req.body.new_password
                    }
             })
             req.flash('success' , 'password changes sucessfully')
             return res.render('home');
         }else{
            req.flash('error' , 'Oops you cant change enter valid details')
            return res.render('home');
         }
        }else{
            req.flash('error' , 'Invalid user name or Old Password')
            return res.render('home');
        }
     })
     }
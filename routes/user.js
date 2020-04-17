const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controller/user_controller');

router.get('/profile',passport.checkAuthentication,userController.profile)

router.get('/sign-in',userController.Signin);

router.get('/sign-up',userController.Signup);

router.post('/create',userController.create);
// use passport a s a middle ware to authenticate
router.post('/create-session',passport.authenticate('local',
{
    failureRedirect:'/user/sign-in',
},
),userController.createSession);

router.get('/sign-out',userController.destroySession)

router.get('/change-password',userController.changePassword);

router.post('/password-change',userController.passwordChange);

module.exports = router;
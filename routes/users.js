const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller')
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

// TODO Profile link from Nav bar is not working right now, since it uses /profile, fix it later
//router.get('/profile', passport.checkAuthentication, usersController.profile);

router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/posts', usersController.posts);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// post method can take 3 arguments. Use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: 'users/sign-in'
    }
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;
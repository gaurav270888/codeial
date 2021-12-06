const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy({
        usernameField: 'email'
    },

    function (email, password, done) {

        User.findOne({ email: email }, function (err, user) {

            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid User/Password --> Passport');
                return done(null, false);
            }

            return done(null, user);
        })

    }));

// serialzing the user's id to be set in cookie of the browser

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

// deserializing the id to be able to search the user id in database for authentication

passport.deserializeUser(function (id, done) {

    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    })
});

// check if the user is authenticated. Creating this function in passport

passport.checkAuthentication = function(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/users/sign-in');
}

// if the user is Authenticated then res locals contains user. Here we are sending it to the views locals
passport.setAuthenticatedUser = function(req, res, next) {

    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
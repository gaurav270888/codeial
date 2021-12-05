const User = require('../models/user');

module.exports.profile = function(req, res) {
    //return res.end('<h1> User Profile </h1>');

    return res.render('users_profile', {
        title: 'Users Profile Page'
    });
}

module.exports.posts = function(req, res) {
    //return res.end('<h1> User Posts </h1>');

    return res.render('users_profile', {
        title: 'Users Posts Page'
    });
}

module.exports.signUp = function(req, res) {

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

module.exports.signIn = function(req, res) {

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

module.exports.create = function(req, res) {

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email : req.body.email}, function(err, user) {
        if (err) {
            console.log('Error in finding Signing Up User');
            return;
        }

        if(!user) {
            User.create(req.body, function(err) {
                if (err) {
                    console.log('Error in creating user');
                }
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res) {

    // TODO later
}
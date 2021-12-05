const User = require('../models/user');

module.exports.profile = function (req, res) {
    //return res.end('<h1> User Profile </h1>');

    if (req.cookies.user_id) {

        User.findById(req.cookies.user_id, function (err, user) {
            if (err) {
                console.log('Error in finding User details');
                return;
            }

            if (user) {
                return res.render('users_profile', {
                    title: 'Users Profile Page',
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        })

    } else {
        return res.redirect('/users/sign-in');
    }

}

module.exports.posts = function (req, res) {
    //return res.end('<h1> User Posts </h1>');

    return res.render('users', {
        title: 'Users Posts Page'
    });
}

module.exports.signUp = function (req, res) {

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

module.exports.signIn = function (req, res) {

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

module.exports.signOut = function (req, res) {

    console.log(req.cookies);

    res.cookie('user_id', "");

    return res.redirect('/users/sign-in');

}

module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding Signing Up User');
            return;
        }

        if (!user) {
            User.create(req.body, function (err) {
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

module.exports.createSession = function (req, res) {

    // find user

    // handle user found

    // handle user password match

    // handle session creation

    // handle user passord dosn't match

    // handle use not found

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding Sign in User');
            return;
        }

        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            }

            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        } else {
            return res.redirect('/users/sign-up');
        }

    });

}
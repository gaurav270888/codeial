const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res) {
    //return res.end('<h1> Express is up for Codeial !!</h1>');
    console.log(req.cookies);

    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: 'Codeial | Home',
    //         posts: posts
    //     });
    // });

    // populate user object for each Post using mongoose populate and exec functions. Look at documentation for more info
    Post.find({}).
        populate('user').
        populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).
        exec(function (err, posts) {

            User.find({}, function(err, users) {

                return res.render('home', {
                    title: 'Codeial | Home',
                    posts: posts,
                    all_users: users
                });

            })  
        });

}
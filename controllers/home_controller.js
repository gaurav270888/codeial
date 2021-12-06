const Post = require('../models/post');

module.exports.home = function (req, res) {
    //return res.end('<h1> Express is up for Codeial !!</h1>');
    console.log(req.cookies);

    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: 'Codeial | Home',
    //         posts: posts
    //     });
    // });

    // populate user object for each Post using mongoose populate andf exec functions. Look at documentation for more info
    Post.find({}).
        populate('user').
        exec(function (err, posts) {
            return res.render('home', {
                title: 'Codeial | Home',
                posts: posts
            });
        });

}
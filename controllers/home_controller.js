const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    //return res.end('<h1> Express is up for Codeial !!</h1>');
    console.log(req.cookies);

    try {
        // populate user object for each Post using mongoose populate and exec functions. Look at documentation for more info
        let posts = await Post.find({}).
            sort('-createdAt').
            populate('user').
            populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({})

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        });

    } catch (error) {
        console.log('Error: ', error);
        return;
    }

}
const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log('Error in creating a Post');
            return;
        }

        return res.redirect('back');
    })
}

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log('Error finding the Post');
            return;
        }
        // .id means converting Object id into string. This feature is provided by mongoose
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err, post) {
                if (err) {
                    console.log('Error in deleting comments on the Post');
                    return;
                }
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    })
}


const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function (req, res) {

    try {

        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        req.flash('success', 'Post published !');
        return res.redirect('back');
        
    } catch (error) {
        //console.log('Error: ', error);
        req.flash('error', error);
        return res.redirect('back');
    }

}

module.exports.destroy = async function (req, res) {

    try {

        let post = await Post.findById(req.params.id);

        // .id means converting Object id into string. This feature is provided by mongoose
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post and associated comments deleted !');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this Post');
            return res.redirect('back');
        }
        
    } catch (error) {
        //console.log('Error: ', error);
        req.flash('error', error);
        return res.redirect('back');
    }

}


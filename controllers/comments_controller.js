const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function (req, res) {

    try {

        let post = await Post.findById(req.body.post)

        if (post) {
            
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })

            post.comments.push(comment);
            post.save();
            res.redirect('/');
        } 
        
    } catch (error) {
        console.log('Error: ', error);
        return;
    }

}

module.exports.destroy = async function (req, res) {

    try {

        let comment = await Comment.findById(req.params.id)

        // .id means converting Object id into string. This feature is provided by mongoose
        if (comment.user == req.user.id) {
    
            let postId = comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull : req.params.id });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error: ', error);
        return;
    }

}
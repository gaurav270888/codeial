const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

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

            comment = await comment.populate('user', 'name email');
            //commentsMailer.newComment(comment);

            let job = queue.create('emails', comment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            })

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                //comment = await comment.populate('user', 'name').execPopulate();
                //comment = await comment.populate('user', 'name');
                
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }

            req.flash('success', 'Commented !');
            res.redirect('/');
        } 
        
    } catch (error) {
        //console.log('Error: ', error);
        req.flash('error', error);
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

            let post = await Post.findByIdAndUpdate(postId, { $pull : req.params.id });

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Commented Deleted !');
            return res.redirect('back');
        } else {
            req.flash('error', 'You are not authorized to delete this comment');
            return res.redirect('back');
        }
        
    } catch (error) {
        //console.log('Error: ', error);
        req.flash('error', error);
        return;
    }

}
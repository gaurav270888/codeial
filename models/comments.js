const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    // store Object Id/ uuid of the user who have made comment
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // store Object Id/ uuid of the Post to which comment belongs
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
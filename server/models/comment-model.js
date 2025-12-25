const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1000
    },
    likedBy: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, { timestamps: true });

const Comment = model("Comment", commentSchema);

module.exports = Comment;
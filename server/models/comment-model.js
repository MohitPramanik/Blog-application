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
        minLength: [1, "Minimum allowed character is 1"],
        maxLength: [1000, "Comment should not exceed 1000 characters"]
    },
    likedBy: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, { timestamps: true });

const Comment = model("Comment", commentSchema);

module.exports = Comment;
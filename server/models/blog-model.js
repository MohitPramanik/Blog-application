const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 5
    },
    content: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 5000
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    tags: [{
        type: String,
        maxLength: 30
    }],
    blogImageUrl: {
        type: String,
        default: ""
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Blog = model("Blog", blogSchema);

module.exports = Blog;
const { Schema, model } = require('mongoose');
const { blogCategories } = require('../utils/constants');

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
    tags: {
        type: [String],
        maxLength: 30,
        default: []
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },
    blogImageUrl: {
        type: String,
        default: ""
    },
    likedByList: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
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
const { Schema, model } = require('mongoose');
// const { blogCategories } = require('../utils/constants');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: [100, "Title should not exceed 100 characters"],
        minLength: [5, "Title should be of min. 5 characters"]
    },
    content: {
        type: String,
        required: true,
        minLength: [20, "Content should be of min. 20 characters"],
        maxLength: [5000, "Content should not exceed 5000 characters"]
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
    }, 
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Blog = model("Blog", blogSchema);

module.exports = Blog;
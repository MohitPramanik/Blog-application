const { Schema, model } = require("mongoose");

const savedBlogsSchema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

savedBlogsSchema.index({blogId: 1, userId: 1},{unique: true});

const SavedBlog = model("SavedBlogs", savedBlogsSchema);

module.exports = SavedBlog;
const Comment = require('../models/comment-model');

const getAllComments = async (req, res) => {
    try {
        const blogId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const comments = await Comment.find({ relatedBlog: blogId }).skip(skip).limit(limit);
        const totalComments = await Comment.countDocuments({ relatedBlog: blogId });
        
        return res.status(200).json({
            status: "SUCCESS",
            data: comments,
            total_records_count: totalComments
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}

const createNewComment = async (req, res) => {
    try {
        const { author, relatedBlog, content } = req.body;
        const newComment = await Comment.create({
            author: author,
            relatedBlog: relatedBlog,
            content: content
        });

        return res.status(201).json({
            status: "SUCCESS",
            message: "Comment created successfully",
            data: newComment._id
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { content, likes, dislikes } = req.body;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment Not Found" });
        }

        if (comment.author !== req.user._id) {
            {
                return res.status(403).json({
                    status: "FAILED",
                    message: "You are not authorized to update this comment."
                });
            }
        }
        await Comment.findByIdAndUpdate(commentId, {
            ...comment,
            content, likes, dislikes
        }, { runValidators: true });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment Not Found" });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({
                status: "FAILED",
                message: "You are not authorized to delete this comment."
            });
        }

        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            status: "SUCCESS",
            message: "Comment Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports = {
    getAllComments,
    createNewComment,
    updateComment,
    deleteComment
};
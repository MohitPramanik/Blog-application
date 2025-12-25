const Comment = require('../models/comment-model');
const Blog = require("../models/blog-model");

const getAllComments = async (req, res) => {
    try {
        const blogId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const userId = req.user.id; // required for mapping isLiked variable with the comment for logged in user

        const comments = await Comment.find({ blog: blogId })
                                      .skip(skip)
                                      .limit(limit)
                                      .sort({ createdAt: -1 })
                                      .populate("author", "username profileImageUrl")
                                      .lean();
        const totalComments = await Comment.countDocuments({ blog: blogId });

        const mappedComments = comments.map((comment) => {
            return {
                ...comment, 
                isLiked: comment?.likedBy?.some(id => id.toString() === userId),
                likedCount: comment?.likedBy?.length
            }
        })

        return res.status(200).json({
            status: "SUCCESS",
            data: mappedComments,
            total_records_count: totalComments
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}

const createNewComment = async (req, res) => {
    try {
        const { id: blogId } = req.params;
        const { content } = req.body;


        const updatedBlog = await Blog.findByIdAndUpdate(
            { _id: blogId },
            { $inc: { commentsCount: 1 } },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                status: "ERROR",
                message: "Blog not found"
            })
        }

        const newComment = await Comment.create({
            blog: updatedBlog,
            content: content,
            author: req.user.id
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
        const { content } = req.body;
        const authorId = req.user.id;

        const updatedComment = await Comment.findOneAndUpdate(
            {
                _id: commentId,
                author: authorId
            },
            {
                $set: { content }
            },
            {
                runValidators: true
            }
        )

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment Not Found or you are not authorized" });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: "Comment updated successfully"
        })

    } catch (error) {
        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to update the comment",
                error: error.message
            }
        );
    }
}

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const authorId = req.user.id;

        const deletedComment = await Comment.findOneAndDelete(
            {
                _id: commentId,
                author: authorId
            }
        );

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment Not Found or you are not authorized" });
        }

        // Decrement comment count from blog if the comment is deleted
        await Blog.findOneAndUpdate(
            { _id: deletedComment.blog, commentsCount: { $gt: 0 } },
            { $inc: { commentsCount: -1 } }
        );

        return res.status(200).json({
            status: "SUCCESS",
            message: "Comment Deleted Successfully"
        });

    }
    catch (error) {
        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to delete the comment",
                error: error.message
            }
        );
    }
}

const likeComment = async (req, res) => {
    const userId = req.user.id;
    const commentId = req.params.id;

    try {
        const result = await Comment.findOneAndUpdate(
            { _id: commentId },
            { $addToSet: { likedBy: userId } }
        )

        return res.status(200).json({
            status: "SUCCESS",
            commentId: result._id
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Server Error",
            error: error.message
        })
    }
}

const dislikeComment = async (req, res) => {
    const userId = req.user.id;
    const commentId = req.params.id;

    try {
        const result = await Comment.findOneAndUpdate(
            { _id: commentId },
            { $pull: { likedBy: userId } }
        );

        return res.status(200).json({
            status: "SUCCESS",
            commentId: result._id
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Server Error",
            error: error.message
        })
    }
}

module.exports = {
    getAllComments,
    createNewComment,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment
};
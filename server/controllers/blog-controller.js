const mongoose = require("mongoose");
const Blog = require("../models/blog-model");
const Comment = require("../models/comment-model");
const User = require("../models/user-model");
const { blogCategories } = require("../utils/constants");

const getAllBlogs = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query?.search?.trim();
    const category = req.query?.category?.trim();
    let filter = {};

    try {
        if (search) {
            const users = await User.find({ username: search }).select("_id");
            const authorIds = users.map(user => user._id);

            filter = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $in: authorIds } },
                ]
            }
        }
        else if (category) {
            filter = { category: { $regex: category, $options: "i" } };
        }

        const blogs = await Blog.find(filter)
            .skip(skip)
            .limit(limit)
            .populate("author", "username _id profileImageUrl")
            .sort({ createdAt: -1 })
            .lean();
        const totalBlogs = await Blog.countDocuments(filter);

        return res.status(200).json({
            status: "SUCCESS",
            data: blogs,
            total_records_count: totalBlogs
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}


const getIndividualBlog = async (req, res) => {
    try {
        const userId = req.user.id;
        const blogId = req.params.id;
        const blog =
            await Blog.findById(blogId)
                .populate("author", "username email profileImageUrl")
                .lean();


        // Checking if logged in user has saved the blog or not
        const user =
            await User.findById(userId)
                .select({ savedBlogs: 1, followingList: 1 })
                .lean();


        const modifiedBlog = {
            ...blog,
            isSaved: user?.savedBlogs?.some(id => id.toString() === blogId),
            isFollowingAuthor: user?.followingList?.some(id => id.toString() === blog.author._id.toString()),
            isLiked: blog?.likedByList?.some(id => id.toString() === user._id.toString())
        }

        return res.status(200).json({
            status: "SUCCESS",
            data: modifiedBlog
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}


const createNewBlog = async (req, res) => {
    try {
        const { title, content, tags, blogImageUrl, category } = req.body;
        const user = await User.findById(req.user.id);
        const newBlog = await Blog.create({
            title, content, author: user, category
        })

        return res.status(201).json({
            status: "SUCCESS",
            message: "Blog Created Successfully",
            blogId: newBlog._id
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}


const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const authorId = req.user.id;
        const { title, content, category } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            {
                _id: blogId,
                author: authorId
            },
            {
                $set: { title, content, category }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog Not Found or you are not authorized" });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog updated successfully"
        })
    }
    catch (err) {
        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to update the blog",
                error: err.message
            }
        );
    }
}


const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const authorId = req.user.id;

        const deletedBlog = await Blog.findOneAndDelete(
            {
                _id: blogId,
                author: authorId
            }
        )

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog Not Found or you are not authorized" });
        }

        // Deleting all the comments of the blog as well when then blog is deleted
        await Comment.deleteMany({ relatedBlog: deletedBlog._id });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog Deleted Successfully",
        });
    }
    catch (err) {
        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to delete the blog",
                error: err.message
            }
        );
    }
}


const getBlogCategories = (req, res) => {
    return res.status(200).json({
        status: "SUCCESS",
        data: blogCategories
    })
}


const getUserBlogs = async (req, res) => {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { author: userId };

    try {
        const blogs = await Blog.find(filter)
            .skip(skip)
            .limit(limit)
            .populate("author", "username profileImageUrl")
            .lean();
        const totalBlogsCount = await Blog.countDocuments(filter);

        return res.status(200).json({
            status: "SUCCESS",
            data: blogs,
            total_records_count: totalBlogsCount
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}


const likeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const currentUserId = req.user.id;

        const updatedBlog = await Blog.findOneAndUpdate(
            {
                _id: blogId,
                likedByList: { $ne: currentUserId } // Only update if user hasn't liked it
            },
            {
                $addToSet: { likedByList: currentUserId },
                $inc: { likesCount: 1 }
            },
        );

        if (!updatedBlog) {
            return res.status(400).json({ message: "You have already liked this blog" });
        }

        console.log(updatedBlog)


        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog post liked successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to like blog post",
            error: error.message
        })
    }
}


const unlikeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;

        const blog = await Blog.findOneAndUpdate(
            {
                _id: blogId,
                likedByList: userId
            },
            {
                $pull: { likedByList: userId },
                $inc: { likesCount: -1 }
            },
            {
                runValidators: true
            }
        );

        if (!blog) {
            return res.status(400).json({ message: "Blog is not liked yet" })
        }

        console.log("Unlike blog", blog);

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog unliked successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to unlike blog post",
            error: error.message
        })
    }
}

module.exports = {
    getAllBlogs,
    getIndividualBlog,
    createNewBlog,
    updateBlog,
    deleteBlog,
    getBlogCategories,
    getUserBlogs,
    likeBlog,
    unlikeBlog
}
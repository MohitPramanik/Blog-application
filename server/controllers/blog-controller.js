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
                    { title: search },
                    { author: { $in: authorIds } },
                ]
            }
        }
        else if (category) {
            filter = { category: category };
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
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId).populate("author", "-password");

        return res.status(200).json({
            status: "SUCCESS",
            data: blog
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

        const { title, content, tags, blogImageUrl, category } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found" });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                status: "FAILED",
                message: "You are not authorized to update this blog"
            });
        }

        await Blog.findByIdAndUpdate(blogId, {
            ...blog,
            title, content, tags, blogImageUrl, category
        }, { runValidators: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}


const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found" });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                status: "FAILED",
                message: "You are not authorized to delete this blog"
            });
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        // Deleting all the comments of the blog as well when then blog is deleted
        await Comment.deleteMany({ relatedBlog: deletedBlog._id });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog Deleted Successfully",
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
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

module.exports = {
    getAllBlogs,
    getIndividualBlog,
    createNewBlog,
    updateBlog,
    deleteBlog,
    getBlogCategories,
    getUserBlogs
}
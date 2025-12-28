const mongoose = require("mongoose");
const Blog = require("../models/blog-model");
const User = require("../models/user-model");
const Category = require("../models/category-model");
const SavedBlog = require("../models/savedBlog-model");

const getAllBlogs = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query?.search?.trim();
    const categoryId = req.query?.categoryId?.trim();
    let filter = { isDeleted: false };

    try {
        if (search) {
            const users = await User.find({ username: search }).select("_id");
            const authorIds = users.map(user => user._id);

            filter = {
                $and: [
                    { isDeleted: false },
                    {
                        $or: [
                            { title: { $regex: search, $options: "i" } },
                            { author: { $in: authorIds } }
                        ]
                    }
                ]
            }
        }
        else if (categoryId) {
            filter = { category: categoryId, isDeleted: false };
        }

        const blogs = await Blog.find(filter)
            .skip(skip)
            .limit(limit)
            .populate("author category", "username _id profileImageUrl name")
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
            await Blog.findOne({ _id: blogId, isDeleted: false })
                .populate("author", "username email profileImageUrl")
                .lean();

        if (!blog) {
            return res.status(500).json({
                status: "FAILED",
                message: "Blog does not exist"
            })
        }

        // Checking if logged in user has saved the blog or not
        const savedBlog =
            await SavedBlog.findOne({ blogId, userId, isDeleted: false })
                .lean();

        const user = await User.findById(userId).lean();


        const responseData = {
            ...blog,
            isSaved: savedBlog ? true : false,
            isFollowingAuthor: user?.followingList?.some(id => id.toString() === blog.author._id.toString()),
            isLiked: blog?.likedByList?.some(id => id.toString() === user._id.toString())
        }

        return res.status(200).json({
            status: "SUCCESS",
            data: responseData
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}


const createNewBlog = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { title, content, category } = req.body;
        const user = await User.findById(req.user.id);
        const newBlog = new Blog({
            title, content, author: user, category
        });

        await newBlog.save({ session });

        await Category.findByIdAndUpdate(category, {
            $inc: { categoryCount: 1 }
        }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            status: "SUCCESS",
            message: "Blog Created Successfully",
            blogId: newBlog._id
        });
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}


const updateBlog = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const blogId = req.params.id;
        const authorId = req.user.id;
        const { title, content, categoryId } = req.body;

        const updatedBlog = await Blog.findOneAndUpdate(
            {
                _id: blogId,
                author: authorId,
                isDeleted: false
            },
            {
                $set: { title, content, category: categoryId }
            },
            {
                session,
                runValidators: true
            }
        );

        if (!updatedBlog) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Blog Not Found or you are not authorized" });
        }


        if (updateBlog.category !== categoryId) {
            await Category.findOneAndUpdate({ _id: updatedBlog.category, categoryCount: { $gt: 0 } }, { $inc: { categoryCount: -1 } }, { session });
            await Category.findOneAndUpdate({ _id: categoryId, }, { $inc: { categoryCount: 1 } }, { session });
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog updated successfully"
        })
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const blogId = req.params.id;
        const authorId = req.user.id;

        // soft delete
        const deletedBlog = await Blog.findOneAndUpdate(
            {
                _id: blogId,
                author: authorId,
                isDeleted: false
            },
            {
                isDeleted: true
            },
            { session }
        )

        if (!deletedBlog) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Blog Not Found or you are not authorized" });
        }

        // Deleting all the comments of the blog as well when then blog is deleted
        // await Comment.deleteMany({ relatedBlog: deletedBlog._id }, { session });

        // await User.find (req.user.id, { $pull: { savedBlogs: blogId } }, { session });

        await SavedBlog.findOneAndUpdate({ blogId }, { isDeleted: true }, { session });

        await Category.findByIdAndUpdate(deletedBlog.category, {
            $inc: { categoryCount: -1 }
        }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog Deleted Successfully",
        });
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to delete the blog",
                error: err.message
            }
        );
    }
}

const recoverDeleteBlog = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const blogId = req.params.id;
        const authorId = req.user.id;

        // soft delete
        const deletedBlog = await Blog.findOneAndUpdate(
            {
                _id: blogId,
                author: authorId
            },
            {
                isDeleted: false
            },
            { session }
        )

        if (!deletedBlog) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Blog Not Found or you are not authorized" });
        }


        await SavedBlog.findOneAndUpdate({ blogId }, { isDeleted: false }, { session });
        // await User.find (req.user.id, { $pull: { savedBlogs: blogId } }, { session });

        await Category.findByIdAndUpdate(deletedBlog.category, {
            $inc: { categoryCount: 1 }
        }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog Recovered Successfully",
        });
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to recover the blog",
                error: err.message
            }
        );
    }
}


const getUserBlogs = async (req, res) => {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { author: userId, isDeleted: false };

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
                likedByList: { $ne: currentUserId }, // Only update if user hasn't liked it,
                isDeleted: false
            },
            {
                $addToSet: { likedByList: currentUserId },
                $inc: { likesCount: 1 }
            },
        );

        if (!updatedBlog) {
            return res.status(400).json({ message: "You have already liked this blog" });
        }

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
                likedByList: userId,
                isDeleted: false
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
    getUserBlogs,
    likeBlog,
    unlikeBlog,
    recoverDeleteBlog
}
const SavedBlog = require("../models/savedBlog-model");

const getAllSavedBlogs = async (req, res) => {
    try {

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        const userId = req.user.id;
        const blogs =
            (await SavedBlog.find({ userId, isDeleted: false })
                .select("blogId -_id")
                .skip(skip)
                .limit(limit)
                .populate("blogId")
                .lean()).map(d => d.blogId);

        const totalSavedBlogsCount = (await SavedBlog.find({ userId, isDeleted: false }).lean()).length;


        return res.status(200).json({
            status: "SUCCESS",
            data: blogs,
            total_records_count: totalSavedBlogsCount
        })
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to fetch blogs",
            error: error.message
        })
    }
}

const saveBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;

        await SavedBlog.create({
            userId,
            blogId
        });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog saved successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to save blog",
            error: error.message
        })
    }
}
const unsaveBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;

        await SavedBlog.findOneAndDelete({
            userId,
            blogId
        });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Blog unsaved successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to unsave blog",
            error: error.message
        })
    }
}

module.exports = {
    getAllSavedBlogs,
    saveBlog,
    unsaveBlog
}
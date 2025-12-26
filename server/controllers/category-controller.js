const Category = require("../models/category-model");

const getAllCategory = async (req, res) => {
    try {
        let result = await Category.find().select({ __v: 0 }).lean();

        return res.status(200).json({
            status: "SUCCESS",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server error",
            error: error.message
        })
    }
}

module.exports = {
    getAllCategory
}
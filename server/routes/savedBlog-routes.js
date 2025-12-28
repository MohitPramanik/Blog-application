const { Router } = require("express");
const { isLoggedIn } = require("../middlewares/auth-middleware");
const savedBlogController= require("../controllers/savedBlog-controller");

const router = Router();

router.route("/")
    .get(isLoggedIn, savedBlogController.getAllSavedBlogs) // save blog


router.route("/:id")
    .post(isLoggedIn, savedBlogController.saveBlog) // save blog
    .delete(isLoggedIn, savedBlogController.unsaveBlog) // unsave blog

module.exports = router;
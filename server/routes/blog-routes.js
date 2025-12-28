const { Router } = require('express');
const blogController = require('../controllers/blog-controller');
const { isLoggedIn } = require('../middlewares/auth-middleware');

const router = Router();


router.route("/")
    .get(blogController.getAllBlogs)  // get all blogs
    .post(isLoggedIn, blogController.createNewBlog); // create new blog


router.route("/user")
    .get(isLoggedIn, blogController.getUserBlogs); // get logged in user blogs


router.route("/:id")
    .get(isLoggedIn, blogController.getIndividualBlog)  // get individual blog
    .put(isLoggedIn, blogController.updateBlog)  // update blog
    .delete(isLoggedIn, blogController.deleteBlog);  // delete blog

router.route("/recover/:id")
    .put(isLoggedIn, blogController.recoverDeleteBlog); // recover deleted blog


router.route("/:id/like")
    .post(isLoggedIn, blogController.likeBlog) // like a blog post
    .delete(isLoggedIn, blogController.unlikeBlog); // unlike a blog post

module.exports = router;
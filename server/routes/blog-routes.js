const { Router } = require('express');
const blogController = require('../controllers/blog-controller');
const { isLoggedIn, isAuthorizedUser } = require('../middlewares/auth-middleware');

const router = Router();


router.route("/")
    .get(blogController.getAllBlogs)  // get all blogs
    .post(isLoggedIn, blogController.createNewBlog); // create new blog


router.route("/:id")
    .get(isLoggedIn, blogController.getIndividualBlog)  // get individual blog
    .put(isLoggedIn, blogController.updateBlog)  // update blog
    .delete(isLoggedIn, blogController.deleteBlog);  // delete blog


module.exports = router;
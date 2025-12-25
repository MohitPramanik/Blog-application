const { Router } = require("express");
const userController = require("../controllers/user.controller");
const { verifyToken, isLoggedIn } = require("../middlewares/auth-middleware");

const router = Router();


router.get("/", userController.getAllUsers);  // Get all users


router.post("/register", userController.registerUser);  // Create new user


router.post("/login", userController.loginUser);  // Login user


router.get("/check", verifyToken, userController.checkAuth); // validate token


router.route("/saved-blogs")
    .get(isLoggedIn, userController.getSavedBlogs); // Get all saved blogs


router.route("/saved-blogs/:blogId")
    .post(isLoggedIn, userController.saveBlog) // to add blog to savelist
    .delete(isLoggedIn, userController.unsaveBlog); // to remove blog from savelist


router.get("/:id", userController.getUserById);  // Get individual user


router.route("/follow")
    .post(isLoggedIn, userController.followAnotherProfile) // to follow a profile
    .delete(isLoggedIn, userController.unfollowAnotherProfile); // to unfollow a profile


module.exports = router;
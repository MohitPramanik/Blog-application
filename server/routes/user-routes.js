const { Router } = require("express");
const userController = require("../controllers/user.controller");
const { verifyToken, isLoggedIn } = require("../middlewares/auth-middleware");
const upload = require("../utils/cloudConfig");


const router = Router();


router.get("/", userController.getAllUsers);  // Get all users


router.post("/register", userController.registerUser);  // Create new user


router.post("/login", userController.loginUser);  // Login user


router.get("/check", verifyToken, userController.checkAuth); // validate token


router.get("/:id", userController.getUserById);  // Get individual user


router.route("/follow")
    .post(isLoggedIn, userController.followAnotherProfile) // to follow a profile
    .delete(isLoggedIn, userController.unfollowAnotherProfile); // to unfollow a profile


router.route("/profile")
    .post(isLoggedIn, upload.single('profileImage'), userController.updateProfile); // to update profile


module.exports = router;
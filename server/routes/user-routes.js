const { Router } = require("express");
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth-middleware");

const router = Router();


router.get("/", userController.getAllUsers);  // Get all users

router.post("/register", userController.registerUser);  // Create new user

router.post("/login", userController.loginUser);  // Login user

router.get("/check", verifyToken, userController.checkAuth); // validate token

router.get("/:id", userController.getUserById);  // Get individual user


module.exports = router;
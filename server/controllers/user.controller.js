const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users.length) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "No users found"
            });
        }
        return res.status(200).json({
            status: "SUCCESS",
            message: users
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const registerUser = async (req, res) => {
    try {
        const { username, email, password, profileImageUrl, dob, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                status: "FAILED",
                message: "User already exists"
            });
        }

        const user = await User.create({ username, email, password, profileImageUrl, dob, role });

        return res.status(201).json({
            status: "SUCCESS",
            message: "User registered successfully",
            userId: user._id,
            token: user.generateToken(user)
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to register user"
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid credentials"
            });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: "User logged in successfully",
            token: user.generateToken(user),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                dob: user.dob
            }
        });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: "SUCCESS",
            message: user
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const checkAuth = async(req, res) => {

    let user = await User.findById(req.user.id).select({password: 0});

    res.status(200).json({
        success: true,
        user: user
    });
};

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserById,
    checkAuth
}
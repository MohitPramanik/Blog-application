const mongoose = require("mongoose");
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

        const userExists = await User.findOne({ email }).lean();

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


const checkAuth = async (req, res) => {

    let user = await User.findById(req.user.id).select({ password: 0 });

    if (user) {
        return res.status(200).json({
            success: true,
            user: user
        });
    }
    else {
        return res.status(500).json({
            success: fail,
            message: "No user found"
        })
    }

};


const followAnotherProfile = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const currentProfileId = req.user.id;
        const anotherProfileId = req.body.profileId;

        // Prevent self-follow
        if (currentProfileId === anotherProfileId) {
            return res.status(400).json(
                {
                    status: "FAILED",
                    message: "You cannot follow yourself"
                }
            );
        }

        // Check if already following
        const alreadyFollowing = await User.findOne({
            _id: currentProfileId,
            followingList: anotherProfileId
        });

        if (alreadyFollowing) {
            return res.status(400).json(
                {
                    status: "FAILED",
                    message: "You are already following this user"
                }
            );
        }



        // Perform for current user
        await User.findByIdAndUpdate(
            currentProfileId,
            { $addToSet: { followingList: anotherProfileId } },
            { session }
        );

        // for another profile user
        await User.findByIdAndUpdate(
            anotherProfileId,
            { $inc: { followersCount: 1 } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(
            {
                status: "SUCCESS",
                message: "User followed successfully"
            }
        );
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to follow user",
                error: error.message
            }
        );
    }
};


const unfollowAnotherProfile = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const currentProfileId = req.user.id;
        const anotherProfileId = req.body.profileId;

        // for current user profile
        await User.findOneAndUpdate(
            {
                _id: currentProfileId,
            },
            {
                $pull: { followingList: anotherProfileId }
            },
            { session }
        );


        // for another user profile
        await User.findOneAndUpdate(
            { _id: anotherProfileId, followersCount: { $gt: 0 } },
            { $inc: { followersCount: -1 } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(
            {
                status: "SUCCESS",
                message: "Profile unfollowed successfully"
            }
        );
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(
            {
                status: "FAILED",
                message: "Failed to unfollow user",
                error: error.message
            }
        );
    }
};


const updateProfile = async (req, res) => {
    try {
        const { username, dob } = req.body;
        const userId = req.user.id;

        let updateFields = {
            username,
            dob
        }

        if (req.file) {
            updateFields = {
                username,
                dob,
                profileImageUrl: req.file.path
            }
        }

        let user = await User.findByIdAndUpdate(userId, updateFields, { new: true, runValidators: true });

        if (!user) {
            return res.status(400).json({
                status: "FAILED",
                message: "Failed to update profile"
            })
        }

        if (req.file) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Profile updated successfully",
                profileUrl: req?.file?.path
            })
        }
        else {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Profile updated successfully",
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to update profile",
            error: error.message
        })
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserById,
    checkAuth,
    followAnotherProfile,
    unfollowAnotherProfile,
    updateProfile
}
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [3, "Username should be of min 3 characters"],
        maxLength: [50, "Username should not exceed 50 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    dob: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        required: true,
        default: "User"
    },
    followingList: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    followersCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
});

userSchema.methods.generateToken = function (user) {
    const privateKey = process.env.SECRET_KEY;

    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }, privateKey, { algorithm: 'HS256', expiresIn: '1d' },);
}

const User = model("User", userSchema);

module.exports = User;


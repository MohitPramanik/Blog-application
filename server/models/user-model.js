const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 3
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
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    }, privateKey, { algorithm: 'HS256', expiresIn: '1d' },);
}

const User = model("User", userSchema);

module.exports = User;


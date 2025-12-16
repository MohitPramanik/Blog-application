const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "JWT token required" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


const isAdmin = (req, res, next) => {
    const authHeader = req.headers.Authorization;

    if (!authHeader || authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "JWT token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(decoded.role === "Admin") {
            next();
        }
        return res.status(403).json({ message: "Unauthorized user" });
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


module.exports = { isLoggedIn, isAdmin };
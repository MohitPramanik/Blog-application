require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/db");

const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const commentRouter = require("./routes/comment-routes");

const { errorHandler } = require("./utils/ExpressError");

const corsOptions = {
    origins: ["http://localhost:5173", "https://t2jl0gdq-5173.inc1.devtunnels.ms"],
    optionsSuccessStatus: 200,
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

app.use(errorHandler);

dbConnect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
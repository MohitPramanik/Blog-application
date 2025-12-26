require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/db");

const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const commentRouter = require("./routes/comment-routes");
const categoryRouter = require("./routes/category-routes");

const { errorHandler } = require("./utils/ExpressError");


const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/category", categoryRouter);

app.use(errorHandler);

dbConnect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
};

function errorHandler(err, req, res, next) {
    const { status = 500, message = "Something went wrong" } = err;
    return res.status(status).json({ message, status });
}

module.exports = { ExpressError, errorHandler };
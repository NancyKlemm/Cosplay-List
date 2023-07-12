// Benutzer gefunden, sonst Errror 404
async function userNotFound(Model, id) {
    const user = await Model.findOne({ _id: id });
    if (!user) {
        consterror = new Error("User not found!");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

// Cosplay gefunden, sonst Error 404
async function cosplayNotFound(Model, id) {
    const cosplay = await Model.findOne({ _id: id });
    if (!user) {
        const error = new Error("Cosplay not found!");
        error.statusCode = 404;
        throw error;
    }
    return cosplay;
}

// Allgemeiner Error Handler
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
    });
}

module.exports = { userNotFound, cosplayNotFound, errorHandler };

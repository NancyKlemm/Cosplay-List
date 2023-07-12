const mongoose = require("mongoose");

const { userRoles } = require("../lib/security/roles");
const { UserSchema } = require("../model/user.schema");
const { userNotFound } = require("./middleware/error.handler");

const User = mongoose.model("User", UserSchema);

// User erstellen
async function createUser(userData) {
    return await User.create(userData);
}

// User authentifitieren damit er sich einloggen kann
async function authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }
    const validPassword = await user.authenticate(password);

    if (!validPassword) {
        return null;
    }
    return user;
}

// Alles User finden
async function getAllUsers() {
    return await User.find({});
}

// bestimmten User finden
async function getSingleUser(id) {
    await userNotFound(User, id);
    return await User.findById(id);
}

// bestimmten User finden und updaten
async function updateUser(id, data) {
    await userNotFound(User, id);
    return await User.findByIdAndUpdate({ _id: id }, data, { new: true });

    // Nur wenn Token des jeweiligen users true oder Admin => dann updaten
}

// bestimmten User finden und löschen
async function deleteUser(id) {
    const user = await userNotFound(User, id);
    // nur der Admin kann User löschen => sonst Error
    if (user.role !== userRoles.ADMIN) {
        const error = new error(
            "Insufficient authorization - You can't delete other users!"
        );
        error.statusCode = 403;
        throw error;
    }
    await User.findByIdAndDelete({ _id: id });
}

module.exports = {
    User,
    authenticateUser,
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};

const {
    createUser,
    authenticateUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
} = require("../model/user.model");
const { createToken } = require("../lib/security/token");
require("dotenv").config()

const secret = process.env.SECRET

// User erstellen
async function httpCreateUser(req, res, next) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}

// User authentifizieren
async function httpAuthenticateUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);

        if (!user) {
            const error = new Error("username or password is invalid");
            error.statusCode = 400;
            throw error;
        }
        // Tokenerstellung
        const token = await createToken(
            {
                username: user.username,
                password: user.password,
                role: user.role,
            },
            secret
        );
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
}

// Alle User finden
async function httpGetAllUsers(req, res, next) {
    const users = await getAllUsers();
    res.json(users);
}

// bestimmten User finden
async function httpGetSingleUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await getSingleUser(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

// bestimmten User finden und updaten
async function httpUpdateUser(req, res, next) {
    try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = await updateUser(id, userData);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

// bestimmte User finden und löschen
async function httpDeleteUser(req, res, next) {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreateUser,
    httpAuthenticateUser,
    httpGetAllUsers,
    httpGetSingleUser,
    httpUpdateUser,
    httpDeleteUser,
};

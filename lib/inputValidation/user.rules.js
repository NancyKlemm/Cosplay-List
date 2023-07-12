const { check } = require("express-validator");

const userValidationRules = {
    signup: [
        check("email")
            .escape()
            .isEmail()
            .withMessage("Please enter a valid email address!")
            .trim(),
        check("username")
            .escape()
            .notEmpty()
            .withMessage("Please enter a username!")
            .isLength({ min: 5 })
            .withMessage("the username must be at least 5 characters long")
            .trim(),
        check("password")
            .escape()
            .notEmpty()
            .withMessage("please enter a password")
            .isLength({ min: 6 })
            .withMessage("the password must be at least 6 characters long")
            .trim(),
    ],
    login: [
        check("username")
            .escape()
            .notEmpty()
            .withMessage("Please enter a username!")
            .isLength({ min: 5 })
            .withMessage("the username must be at least 5 characters long")
            .trim(),
        check("password")
            .escape()
            .notEmpty()
            .withMessage("please enter a password")
            .isLength({ min: 6 })
            .withMessage("the password must be at least 6 characters long")
            .trim(),
    ],
};

module.exports = { userValidationRules }

const express = require("express");
const router = express.Router();

const {
    httpCreateUser,
    httpAuthenticateUser,
    httpGetAllUsers,
    httpGetSingleUser,
    httpUpdateUser,
    httpDeleteUser,
} = require("../controller/user.controller");

const { userValidationRules } = require("../lib/inputValidation/user.rules")
const { validationInputs } = require("../middleware/input.validation")

const {
    authenticateToken,
    protectRoute,
} = require("../middleware/user.validation");

/* GET users listing. */
router.get("/", authenticateToken, function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/all", authenticateToken, protectRoute, httpGetAllUsers)


router.post("/signup", validationInputs(userValidationRules.signup), httpCreateUser)

router.post("/login", validationInputs(userValidationRules.login), httpAuthenticateUser)

router
    .use(authenticateToken)
    .route("/:id")
    .get(httpGetSingleUser)
    .put(httpUpdateUser)
    .delete(httpDeleteUser);

module.exports = router;

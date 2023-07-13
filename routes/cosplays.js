const express = require("express");
const router = express.Router();

const {
    httpCreateCosplay,
    httpGetAllCosplays,
    httpGetSingleCosplay,
    httpGetUserCosplays,
    httpUpdateCosplay,
    httpDeleteCosplay,
} = require("../controller/cosplay.controller");

const {
    authenticateToken,
    protectRoute,
} = require("../middleware/user.validation");

router.get("/all", authenticateToken, protectRoute, httpGetAllCosplays);

router.post("/create", authenticateToken, httpCreateCosplay);

router
    .use(authenticateToken)
    .route("/:id")
    .get(httpGetSingleCosplay)
    .put(httpUpdateCosplay)
    .delete(httpDeleteCosplay);

router
    .use(authenticateToken)
    .route("/owncosplays/:id")
    .get(httpGetUserCosplays);

module.exports = router;

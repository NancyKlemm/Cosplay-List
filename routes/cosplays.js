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

// alle Cosplays aller User werden dem Admin angezeigt
router.get("/all", authenticateToken, protectRoute, httpGetAllCosplays);

// alle Cosplays eines bestimmten Users werden angezeigt
router.route("/user/:id").get(authenticateToken, httpGetUserCosplays); // User ID

// Cosplay wird erstellt
router.post("/", authenticateToken, httpCreateCosplay);

// CRUD für einzelne Cosplays
router
    .use(authenticateToken)
    .route("/:id") // Cosplay ID
    .get(httpGetSingleCosplay)
    .put(httpUpdateCosplay)
    .delete(httpDeleteCosplay);

module.exports = router;

const express = require("express")
const router = express.Router()

const { httpCreateCosplay } = require("../controller/cosplay.controller")

router.post("/create", httpCreateCosplay)

module.exports = router

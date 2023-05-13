const express = require("express");
const { apiInit } = require("../controllers/apiController");

const router = express.Router();

router.get("", apiInit);

module.exports = router;
const express = require("express");
const { authInit } = require("../controllers/authController");

const router = express.Router();

router.get("", authInit);

module.exports = router;
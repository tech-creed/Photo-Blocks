const express = require("express");

// route controller
const Controller = require("../controllers/ipfsController");
const router = express.Router();

// ipfs routes
router.post("/upload", Controller.Upload)
router.get("/retrive", Controller.Retrive)

module.exports = router;
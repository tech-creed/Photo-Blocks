const express = require("express");

// route controller
const Controller = require("../controllers/ipfsController");
const router = express.Router();

// ipfs routes
router.post("/upload", Controller.Upload)

router.get("/upload", Controller.GetUpload)

router.get("/gallary", Controller.GetGallary)

router.get("/retrive", Controller.Retrive)

module.exports = router;
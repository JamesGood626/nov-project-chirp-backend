const express = require("express");
const router = express.Router();
const checkCommentInputs = require("../validation");
const createCommentIfAuthorized = require("../service/create")

//create comment
router.post("/",checkCommentInputs, createCommentIfAuthorized);

module.exports = router;
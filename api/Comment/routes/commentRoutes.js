const express = require("express");
const router = express.Router();
const checkCommentInputs = require("../validation");
const createCommentIfAuthorized = require("../service/create")
const getCommentsIfAuthorized = require("../service/retrieve")
//create comment
router.post("/", checkCommentInputs, createCommentIfAuthorized);

router.get("/:chirpId", getCommentsIfAuthorized);
module.exports = router;
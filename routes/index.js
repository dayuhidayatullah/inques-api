const express = require("express");
const router = express.Router();
const user = require("./users");
const auction = require("./auction");
/* GET home page. */
router.use(user);
router.use(auction);
module.exports = router;

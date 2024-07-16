const question = require('./question')

var express = require("express");
var router = express.Router();
/* GET users listing. */
router.use("/question", question);
module.exports = router;
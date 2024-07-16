var express = require("express");
var router = express.Router();
const Question = require("../../controllers/admin/question.js");

/* GET users listing. */
router.get("/listQuestionByType/:trnId", Question.getQuestionByType);

module.exports = router;

var express = require("express");
var router = express.Router();
const Question = require("../../controllers/admin/question.js");

/* GET users listing. */
router.get("/listQuestionByType/:trnId", Question.getQuestionByType);
router.get("/scoresum/:trnId", Question.getScoreSummary)
router.get('/scoreSumByDate/:questionId', Question.getScoreSummaryByDate)
router.get('/totalVotes/:questionId', Question.getTotalVotes)


module.exports = router;

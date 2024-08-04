var express = require("express");
var router = express.Router();
const Survey = require("../controllers/survey");
const Option = require("../controllers/option")
/* GET users listing. */
router.get("/survey", Survey.getSurvey);
// router.get('/survey/optionitems', Option.getOptionItems)
router.get('/survey/optionitemimages', Option.getOptionItemImage)
router.post('/survey/:questionId/submit', Survey.surveySubmit)
module.exports = router;

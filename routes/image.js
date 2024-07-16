var express = require("express");
var router = express.Router();
const Image = require('../controllers')
/* GET users listing. */
router.get("/survey", Survey.getSurvey);
router.get('/survey/optionitems', Option.getOptionItems)
module.exports = router;

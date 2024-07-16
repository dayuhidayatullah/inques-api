const express = require("express");
const router = express.Router();
const user = require("./users");
const auction = require("./auction");
const survey = require('./survey')
const admin = require('./admin')
/* GET home page. */
router.use(user);
router.use(auction);
router.use(survey);
router.use('/admin', admin);
module.exports = router;

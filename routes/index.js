const express = require("express");
const router = express.Router();
const user = require("./users");
const auction = require("./auction");
const survey = require('./survey')
const admin = require('./admin')
const upload = require('./upload')
/* GET home page. */
router.use(user);
router.use(auction);
router.use(survey);
router.use(upload);
router.use('/admin',admin);
module.exports = router;

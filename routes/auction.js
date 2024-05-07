var express = require("express");
var router = express.Router();
const Auction = require("../controllers/auction");

/* GET users listing. */
router.get("/auction/private", Auction.PrivateAuction);

module.exports = router;

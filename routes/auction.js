var express = require("express");
var router = express.Router();
const Auction = require("../controllers/auction");

/* GET users listing. */
router.get("/private/auction", Auction.PrivateAuction);

module.exports = router;

var express = require("express");
const UserController = require("../controllers/user");
var router = express.Router();

/* GET users listing. */
router.post("/login", UserController.loginCustomer);

module.exports = router;

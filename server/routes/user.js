const express = require("express");
const {getTransactions, handleHome, handleExpenses} = require("../controllers/user");

const router = express.Router();

router.get("/", handleHome);
router.route("/raw/:address").get(getTransactions);
router.route("/:address").get(handleExpenses);

module.exports = router;
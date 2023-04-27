const express = require("express");
const router = express.Router();

const { getContributers } = require("../controller/userController");

router.route("/:org/:repo/:year?/:month?").get(getContributers);

module.exports = router;

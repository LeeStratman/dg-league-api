const eventController = require("../controllers/eventController");
const { Router } = require("express");
const router = Router();

router.route("/").post(eventController.createOne);

module.exports = router;

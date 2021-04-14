const courseController = require("../controllers/courseController");
const { Router } = require("express");
const router = Router();

router.route("/").get(courseController.getAll);

router.route("/:id").get(courseController.getOne);

module.exports = router;

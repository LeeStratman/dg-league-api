const courseController = require("../controllers/courseController");
const { Router } = require("express");
const router = Router();

router.route("/").get(courseController.getAll).post(courseController.createOne);

router
  .route("/:id")
  .get(courseController.getOne)
  .put(courseController.updateOne)
  .delete(courseController.removeOne);

module.exports = router;

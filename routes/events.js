const eventController = require("../controllers/eventController");
const { Router } = require("express");
const router = Router();

router.route("/").post(eventController.createOne);

router
  .route("/:id")
  .get(eventController.getOne)
  .put(eventController.updateOne)
  .delete(eventController.deleteOne);

module.exports = router;

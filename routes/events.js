const eventController = require("../controllers/eventController");
const { validateScorecard } = require("../middlewares/validation/scorecard");
const { Router } = require("express");
const router = Router();

router.route("/").post(eventController.createOne);

router
  .route("/:id")
  .get(eventController.getOne)
  .put(eventController.updateOne)
  .delete(eventController.deleteOne);

router
  .route("/:id/scorecard")
  .post(validateScorecard, eventController.createScorecard);

router
  .route("/:id/scorecard/:scorecardId")
  .get(eventController.getScorecard)
  .put(eventController.updateScorecard)
  .delete(eventController.deleteScorecard);

module.exports = router;

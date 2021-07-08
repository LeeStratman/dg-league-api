const leagueController = require("../controllers/leagueController");
const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(leagueController.getMany)
  .post(leagueController.createOne);

router.route("/search").get(leagueController.search);

router
  .route("/:id")
  .get(leagueController.getOne)
  .put(leagueController.updateOne)
  .delete(leagueController.deleteOne);

router.route("/:id/join").post(leagueController.joinLeague);

router.route("/:id/add-course").post(leagueController.addCourse);
router.route("/:id/remove-course").post(leagueController.removeCourse);

router.route("/:id/events").get(leagueController.getEvents);
router.route("/:id/players").get(leagueController.getPlayers);

module.exports = router;

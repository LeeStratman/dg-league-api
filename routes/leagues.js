const leagueController = require("../controllers/leagueController");
const {
  validateLeague,
  validateLeagueOrganizer,
  validateLeagueName,
} = require("../middlewares/validate");
const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(leagueController.getLeagues)
  .post(
    [validateLeague, validateLeagueOrganizer, validateLeagueName],
    leagueController.createOne
  );

router
  .route("/:id")
  .get(leagueController.getOne)
  .put(leagueController.updateOne)
  .delete(leagueController.removeOne);

router.route("/:id/users/:userId").put(leagueController.addUserToLeague);

router.route("/:id/layouts/:layoutId").put(leagueController.updateLayout);

router.route("/:id/events").post(leagueController.createEvent);

router
  .route("/:id/events/:eventId/scorecard")
  .post(leagueController.createScorecard);

router
  .route("/:id/events/:eventId/scorecard/:scorecardId")
  .post(leagueController.addScore);

module.exports = router;

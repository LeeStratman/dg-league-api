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

module.exports = router;

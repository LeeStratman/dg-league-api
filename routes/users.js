const userController = require("../controllers/userController");
const { Router } = require("express");
const router = Router();
const { userIdMatchesToken } = require("../middlewares/validate");

router
  .route("/:id")
  .get(userIdMatchesToken, userController.getOne)
  .put(userIdMatchesToken, userController.updateOne)
  .delete(userIdMatchesToken, userController.removeOne);

router.route("/:id/leagues").get(userController.getLeagues);
router.route("/:id/leagues/:leagueId").get(userController.getLeague);

module.exports = router;

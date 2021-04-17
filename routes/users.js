const userController = require("../controllers/userController");
const { Router } = require("express");
const router = Router();

router
  .route("/:id")
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.removeOne);

router.route("/:id/leagues").get(userController.getLeagues);
router.route("/:id/leagues/:leagueId").get(userController.getLeague);

module.exports = router;

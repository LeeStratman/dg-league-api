const playerController = require("../controllers/playerController");
const { Router } = require("express");
const router = Router();

router.route("/").get(playerController.getAll).post(playerController.createOne);

router
  .route("/:id")
  .get(playerController.getOne)
  .put(playerController.updateOne)
  .delete(playerController.removeOne);

module.exports = router;

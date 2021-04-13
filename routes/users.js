const userController = require("../controllers/userController");
const { Router } = require("express");
const router = Router();

router.route("/").get(userController.getAll).post(userController.createOne);

router
  .route("/:id")
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.removeOne);

router.route("/:id/rounds").get(userController.getAllRounds);

module.exports = router;

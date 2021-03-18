const roundController = require("../controllers/roundController");
const { Router } = require("express");
const router = Router();

router.route("/").get(roundController.getAll).post(roundController.createOne);

router
  .route("/:id")
  .get(roundController.getOne)
  .put(roundController.updateOne)
  .delete(roundController.removeOne);

module.exports = router;

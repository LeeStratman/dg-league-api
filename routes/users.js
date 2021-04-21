const userController = require("../controllers/userController");
const { Router } = require("express");
const router = Router();
const { userIdMatchesToken } = require("../middlewares/validation/user");

router.route("/me").get(userController.getMe);

router
  .route("/:id")
  .get(userIdMatchesToken, userController.getOne)
  .put(userIdMatchesToken, userController.updateOne)
  .delete(userIdMatchesToken, userController.removeOne);

module.exports = router;

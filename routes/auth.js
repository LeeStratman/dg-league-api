const authController = require("../controllers/authController");
const { Router } = require("express");
const {
  validateUser,
  userEmailExists,
} = require("../middlewares/validation/user");
const router = Router();

router
  .route("/signup")
  .post([validateUser, userEmailExists], authController.signup);

router.route("/signin").post(authController.signin);

module.exports = router;

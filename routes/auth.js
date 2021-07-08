const authController = require("../controllers/authController");
const { Router } = require("express");
const {
  validateUser,
  userEmailExists,
} = require("../middlewares/validation/user");
const { protect } = require("../middlewares/auth");
const router = Router();

router.route("/").post(protect, authController.authorize);

router
  .route("/signup")
  .post([validateUser, userEmailExists], authController.signup);

router.route("/signin").post(authController.signin);

module.exports = router;

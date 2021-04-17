const authController = require("../controllers/authController");
const { Router } = require("express");
const { validateUser, userEmailExists } = require("../middlewares/validate");
const router = Router();

router
  .route("/signup")
  .post([validateUser, userEmailExists], authController.signup);

module.exports = router;

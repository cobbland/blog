const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const validator = require("../middleware/validators");
const auth = require("../middleware/auth");

router.get("/", auth.requireAuth, controller.isLoggedIn);
router.post(
    "/login",
    validator.validateUsername,
    validator.validationResults,
    controller.login,
);
router.post("/logout", auth.requireAuth, controller.logout);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const validator = require("../middleware/validators");
const controller = require("../controllers/draft");

// get user's drafts
router.get("/", auth.requireAuth, auth.requireAuthor, controller.getDrafts);

// get user's specific draft
router.get(
    "/:postId",
    auth.requireAuth,
    auth.requireAuthor,
    auth.requireSameAuthor,
    controller.getDraft,
);

module.exports = router;

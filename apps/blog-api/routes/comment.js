const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../controllers/comment");
const validator = require("../middleware/validators");

// get all comments on post
router.get("/", controller.getComments);

// post a comment on post
router.post(
    "/",
    validator.validateComment,
    validator.validationResults,
    controller.postComment,
);

// get a specific comment by id on post
router.get("/:commentId", controller.getComment);

// edit a specific comment by id on post after checking authorization
router.put("/:commentId", controller.putComment); // TKTK

// delete a specific comment by id on post after checking authorization
router.delete("/:commentId", controller.deleteComment); // TKTK

module.exports = router;

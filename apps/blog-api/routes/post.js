const express = require("express");
const router = express.Router();
const controller = require("../controllers/post");
const auth = require("../middleware/auth");
const validator = require("../middleware/validators");

// get all posts
router.get("/", controller.getPosts);

// get single post by id
router.get("/:postId", controller.getPost);

// get single post's comments by id
router.get("/:postId/comments", controller.getComments);

// create a post after checking authorization (draft or published?)
router.post(
    "/",
    auth.requireAuth,
    auth.requireAuthor,
    validator.validatePostTitle,
    validator.validatePostContent,
    controller.postPost,
);

// edit a post after checking authorization
router.put(
    "/:postId",
    auth.requireAuth,
    auth.requireAuthor,
    auth.requireSameAuthor,
    validator.validatePostTitleOptional,
    controller.putPost,
);

// delete a post after checking authorization
router.delete(
    "/:postId",
    auth.requireAuth,
    auth.requireAuthor,
    auth.requireSameAuthor,
    controller.deletePost,
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const validator = require("../middleware/validators");
const auth = require("../middleware/auth");

// get all users
router.get("/", controller.getUsers);

// get single user by id
router.get("/:userId", controller.getUser);

// get single user's posts by id
router.get("/:userId/posts", controller.getUserPosts);

// get single user's comments
router.get("/:userId/comments", controller.getUserComments);

// create a user
router.post(
    "/",
    validator.validateUsername,
    validator.validatePassword,
    validator.validationResults,
    controller.postUser,
);

// edit a user after checking authorization
router.put(
    "/:userId",
    auth.requireAuth,
    auth.requireSameUser,
    validator.validateUsernameOptional,
    validator.validatePasswordOptional,
    validator.validationResults,
    controller.putUser,
);

// delete a user after checking authorization
router.delete(
    "/:userId",
    auth.requireAuth,
    auth.requireSameUser,
    controller.deleteUser,
);

module.exports = router;

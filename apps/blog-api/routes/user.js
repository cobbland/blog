const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

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
    controller.validateUsername,
    controller.validatePassword,
    controller.postUser,
);

// edit a user after checking validation
router.put("/:userId", (req, res) => {
    const authorized = true; // TKTK
    if (authorized) {
        return res.send(`EDITING USER WITH ID ${req.params.userId}`); // TKTK
    } else {
        return res.status(401).send("UNAUTHORIZED"); // TKTK
    }
});

// delete a user after checking validation
router.delete("/:userId", (req, res) => {
    const authorized = true; // TKTK
    if (authorized) {
        return res.send(`DELETING USER WITH ID ${req.params.userId}`); // TKTK
    } else {
        return res.status(401).send("UNAUTHORIZED"); // TKTK
    }
});

module.exports = router;

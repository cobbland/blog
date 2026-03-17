const express = require("express");
const router = express.Router();

// get all users
router.get("/", (req, res) => {
    return res.send("HERE ARE ALL THE USERS"); // TKTK
});

// get single user by id
router.get("/:userId", (req, res) => {
    return res.send(`USER WITH ID ${req.params.userId}`); // TKTK
});

// get single user's posts by id
router.get("/:userId/posts", (req, res) => {
    return res.send(`ALL POSTS BY USER WITH ID ${req.params.userId}`); // TKTK
});

// get single user's comments
router.get("/:userId/comments", (req, res) => {
    return res.send(`ALL COMMENTS BY USER WITH ID ${req.params.userId}`); // TKTK
});

// create a user
router.post("/", (req, res) => {
    return res.send("CREATED A NEW USER"); // TKTK
});

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

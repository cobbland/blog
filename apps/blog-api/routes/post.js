const express = require("express");
const router = express.Router();

// get all posts
router.get("/", (req, res) => {
    return res.send("HERE ARE ALL THE POSTS"); // TKTK
});

// get single post by id
router.get("/:postId", (req, res) => {
    return res.send(`POST WITH ID ${req.params.postId}`); // TKTK
});

// get single post's comments by id
router.get("/:postId/comments", (req, res) => {
    return res.send(`ALL COMMENTS BY POST WITH ID ${req.params.postId}`); // TKTK
});

// create a post after checking validation (draft or published?)
router.post("/", (req, res) => {
    const authorized = true; // TKTK
    if (authorized) {
        return res.send("CREATED A NEW POST"); // TKTK
    } else {
        return res.status(401).send("UNAUTHORIZED"); // TKTK
    }
});

// edit a post after checking validation
router.put("/:postId", (req, res) => {
    const authorized = true; // TKTK
    if (authorized) {
        return res.send(`EDITING POST WITH ID ${req.params.postId}`); // TKTK
    } else {
        return res.status(401).send("UNAUTHORIZED"); // TKTK
    }
});

// delete a post after checking validation
router.delete("/:postId", (req, res) => {
    const authorized = true; // TKTK
    if (authorized) {
        return res.send(`DELETING POST WITH ID ${req.params.postId}`); // TKTK
    } else {
        return res.status(401).send("UNAUTHORIZED"); // TKTK
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();

// get all comments
router.get("/", (req, res) => {
    return res.send("ALL COMMENTS"); // TKTK
});

// get a specific comment by id
router.get("/:commentId", (req, res) => {
    return res.send(`COMMENT WITH ID ${req.params.commentId}`); // TKTK
});

// edit a specific comment by id after checking authorization
router.put("/:commentId", (req, res) => {
    const authorized = true; // TKTK
    if (authorized) {
        return res.send(`EDITING COMMENT WITH ID ${req.params.commentId}`); // TKTK
    } else {
        return res.status(401).send("UNAUTHORIZED"); // TKTK
    }
});

// delete a specific comment by id after checking authorization
router.delete("/:commentId", (req, res) => {
    const authorized = true; // TKTK
    if (authorized) {
        return res.send(`DELETING COMMENT WITH ID ${req.params.commentId}`); // TKTK
    } else {
        return res.status(401).send("UNAUTHORIZED"); // TKTK
    }
});

module.exports = router;

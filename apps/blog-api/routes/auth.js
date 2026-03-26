const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.get("/", (req, res) => {
    if (req.user) {
        return res.send(req.user);
    } else {
        return res.send(false);
    }
});

router.post("/", controller.validateUsername, controller.login);

module.exports = router;

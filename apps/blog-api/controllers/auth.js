const { body, validationResult } = require("express-validator"); // Is this right? Refer to docs
const passport = require("passport");

const validateUsername = [body("username").trim().notEmpty().escape()];

const login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth",
    failureMessage: true,
});

module.exports = {
    validateUsername,
    login,
};

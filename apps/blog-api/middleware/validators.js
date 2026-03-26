const { body } = require("express-validator");

const validateUsername = [body("username").trim().notEmpty().escape()];
const validatePassword = [body("password").notEmpty().isStrongPassword()];
const validateUsernameOptional = [
    body("username").trim().notEmpty().escape().optional(),
];
const validatePasswordOptional = [
    body("password").notEmpty().isStrongPassword().optional(),
];
const validatePostTitle = [body("title").trim().notEmpty().escape()];
const validatePostContent = [body("content").optional()];
const validatePostTitleOptional = [
    body("title").trim().notEmpty().escape().optional(),
];

module.exports = {
    validatePassword,
    validatePasswordOptional,
    validateUsername,
    validateUsernameOptional,
    validatePostTitle,
    validatePostContent,
    validatePostTitleOptional,
};

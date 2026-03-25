const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator"); // Is this right? Refer to docs
require("dotenv/config");
const authorPass = process.env.AUTHOR_PASS || false;

const validateUsername = [body("username").trim().notEmpty().escape()];

const validatePassword = [body("password").notEmpty().isStrongPassword()];

async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function getUser(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +req.params.userId,
            },
        });
        res.send(user);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function getUserPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                userId: +req.params.userId,
            },
        });
        res.send(posts);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function getUserComments(req, res) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                userId: +req.params.userId,
            },
        });
        res.send(comments);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function postUser(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(404).json({ errors: valResult.array() });
    }
    const { username, password, name, author } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                name: name || null,
                author: author === authorPass ? true : false,
            },
        });
        return res.send(user);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function putUser(req, res) {
    try {
        return; // TKTK
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function deleteUser(req, res) {
    try {
        return; // TKTK
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

module.exports = {
    validateUsername,
    validatePassword,
    getUsers,
    getUser,
    getUserPosts,
    getUserComments,
    postUser,
    putUser,
    deleteUser,
};

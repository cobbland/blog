const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv/config");
const authorPass = process.env.AUTHOR_PASS || false;

async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            omit: {
                password: true,
            },
        });
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
                authorId: +req.params.userId,
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
                authorId: +req.params.userId,
            },
        });
        res.send(comments);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function postUser(req, res) {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(404).json({ errors: results.array() });
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
    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(404).json({ errors: results.array() });
    }
    const { username, password, name, author } = req.body;
    const userData = {};
    for (const [key, value] of Object.entries({
        username,
        password,
        name,
        author,
    })) {
        if (value !== undefined) {
            if (key === "password") {
                userData[key] = await bcrypt.hash(value, 10);
            } else if (key === "author") {
                if (value === authorPass) {
                    userData[key] = true;
                }
            } else {
                userData[key] = value;
            }
        }
    }
    try {
        const user = await prisma.user.update({
            where: {
                id: +req.user.id,
            },
            data: userData,
        });
        return res.send(user);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: +req.user.id,
            },
        });
        return res.send(user);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

module.exports = {
    getUsers,
    getUser,
    getUserPosts,
    getUserComments,
    postUser,
    putUser,
    deleteUser,
};

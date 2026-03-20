const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");

async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (err) {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
    }
}

async function postUser(req, res) {
    try {
        return; // TKTK need password hashing and such first
        // also, how to make this RESTful? how to send data (username, password, etc)
    } catch (err) {
        console.log(err);
    }
}

async function putUser(req, res) {
    try {
        return; // TKTK
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(req, res) {
    try {
        return; // TKTK
    } catch (err) {
        console.log(err);
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

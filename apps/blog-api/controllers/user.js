const { prisma } = require("../lib/prisma.js");

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

module.exports = {
    getUsers,
    getUser,
    getUserPosts,
};

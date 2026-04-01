const { prisma } = require("../lib/prisma.js");
const { validationResult } = require("express-validator");

async function getPosts(req, res, next) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.send(posts);
    } catch (err) {
        return next(err);
    }
}

async function getPost(req, res, next) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: +req.params.postId,
                published: true,
            },
        });
        if (!post) {
            return res.status(404).json({ errors: ["Not found"] });
        }
        return res.send(post);
    } catch (err) {
        return next(err);
    }
}

async function postPost(req, res, next) {
    try {
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content || "",
                published: req.body.published || false,
                authorId: +req.user.id,
            },
        });
        return res.send(post);
    } catch (err) {
        return next(err);
    }
}

async function putPost(req, res, next) {
    const { title, content, published, createdAt } = req.body;
    const postData = {};
    for (const [key, value] of Object.entries({
        title,
        content,
        published,
        createdAt,
    })) {
        if (value !== undefined) {
            postData[key] = value;
        }
    }
    try {
        const post = await prisma.post.update({
            where: {
                id: +req.params.postId,
            },
            data: postData,
        });
        return res.send(post);
    } catch (err) {
        return next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        const post = await prisma.post.delete({
            where: {
                id: +req.params.postId,
            },
        });
        return res.send(post);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getPosts,
    getPost,
    postPost,
    putPost,
    deletePost,
};

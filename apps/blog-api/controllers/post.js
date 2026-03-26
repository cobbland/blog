const { prisma } = require("../lib/prisma.js");
const { validationResult } = require("express-validator");

async function getPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
        });
        return res.send(posts);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function getPost(req, res) {
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
        return res.status(404).json({ errors: err });
    }
}

async function getComments(req, res) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: +req.params.postId,
            },
        });
        return res.send(comments);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

async function postPost(req, res) {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(404).json({ errors: results.array() });
    }
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
        return res.status(404).json({ errors: err });
    }
}

async function putPost(req, res) {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(404).json({ errors: results.array() });
    }
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
        return res.status(404).json({ errors: err });
    }
}

async function deletePost(req, res) {
    try {
        const post = await prisma.post.delete({
            where: {
                id: +req.params.postId,
            },
        });
        return res.send(post);
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

module.exports = {
    getPosts,
    getPost,
    getComments,
    postPost,
    putPost,
    deletePost,
};

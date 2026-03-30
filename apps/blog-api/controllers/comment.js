const { prisma } = require("../lib/prisma.js");
const { validationResult } = require("express-validator");

async function getComments(req, res) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: +req.params.postId,
            },
        });
        return res.send(comments);
    } catch (err) {
        return next(err);
    }
}

async function getComment(req, res) {
    try {
        const comment = await prisma.post.findUnique({
            where: {
                id: +req.params.commentId,
                postId: +req.params.postId,
            },
        });
        if (!comment) {
            return res.status(404).json({ errors: ["Not found"] });
        }
        return res.send(comment);
    } catch (err) {
        return next(err);
    }
}

async function postComment(req, res) {
    try {
        const comment = await prisma.comment.create({
            data: {
                content: req.body.content,
                authorId: req.user ? +req.user.id : null,
                guestName: req.user ? null : req.body.guestName || null,
                postId: +req.params.postId,
            },
        });
        return res.send(comment);
    } catch (err) {
        return next(err);
    }
}

async function putComment(req, res) {
    try {
        const comment = await prisma.comment.update({
            where: {
                id: +req.params.postId,
            },
            data: {
                content: req.body.content,
            },
        });
        return res.send(comment);
    } catch (err) {
        return next(err);
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: +req.params.commentId,
            },
            include: {
                post: true,
            },
        });
        if (
            req.user.id != comment.post.authorId &&
            req.user.id != comment.authorId
        ) {
            return res.status(401).json({ errors: ["Unauthorized"] });
        }
        const deletedComment = await prisma.comment.delete({
            where: {
                id: +req.params.commentId,
            },
        });
        return res.send(deletedComment);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getComments,
    getComment,
    postComment,
    putComment,
    deleteComment,
};

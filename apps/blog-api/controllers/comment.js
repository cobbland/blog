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
        return res.status(404).json({ errors: err });
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
        return res.status(404).json({ errors: err });
    }
}

async function postComment(req, res) {
    // TKTK
}

async function putComment(req, res) {
    // TKTK
}

async function deleteComment(req, res) {
    // TKTK
}

module.exports = {
    getComments,
    getComment,
    postComment,
    putComment,
    deleteComment,
};

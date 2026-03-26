const { prisma } = require("../lib/prisma.js");

function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }
    next();
}

function requireSameUser(req, res, next) {
    if (req.user.id != req.params.userId) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }
    next();
}

function requireAuthor(req, res, next) {
    if (!req.user.author) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }
    next();
}

async function requireSameAuthor(req, res, next) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: +req.params.postId,
            },
        });
        if (req.user.id != post.authorId) {
            return res.status(401).json({ errors: ["Unauthorized"] });
        }
        next();
    } catch (err) {
        return res.status(404).json({ errors: err });
    }
}

module.exports = {
    requireAuth,
    requireSameUser,
    requireAuthor,
    requireSameAuthor,
};

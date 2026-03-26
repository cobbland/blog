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

module.exports = {
    requireAuth,
    requireSameUser,
};

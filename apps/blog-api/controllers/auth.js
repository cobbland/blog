const passport = require("passport");

function isLoggedIn(req, res) {
    return res.send(req.user);
}

function login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ errors: info.errors });
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ user });
        });
    })(req, res, next);
}

function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: "Logged out successfully" });
    });
}

module.exports = {
    isLoggedIn,
    login,
    logout,
};

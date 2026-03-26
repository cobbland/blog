const express = require("express");
const app = express();
const session = require("express-session");
const { prisma } = require("./lib/prisma");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

require("dotenv/config");
const port = process.env.PORT || 3000;

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username,
                },
            });
            if (!user) {
                return done(null, false, {
                    errors: ["Incorrect username or password"],
                });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, {
                    errors: ["Incorrect username or password"],
                });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            omit: {
                password: true,
            },
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const sessionStore = new PrismaSessionStore(prisma, {
    checkPeriod: 24 * 60 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/auth", routes.auth);
app.use("/users", routes.user);
app.use("/posts", routes.post);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

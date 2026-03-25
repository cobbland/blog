const express = require("express");
const app = express();
const session = require("express-session");
const { prisma } = require("./lib/prisma");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

require("dotenv/config");
const port = process.env.PORT || 3000;

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/comments", routes.comment);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

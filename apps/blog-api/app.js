const express = require("express");
const app = express();
require("dotenv/config");

const routes = require("./routes");

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/comments", routes.comment);

const port = process.env["PORT"] || 3000;
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

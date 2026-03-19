const express = require("express");
const app = express();

require("dotenv/config");
const port = process.env["PORT"] || 3000;

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/comments", routes.comment);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

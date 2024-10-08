const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("E-Commerce site for running clothes");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Web server is listening at port {port}`);
})
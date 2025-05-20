import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Server is now setup");
});

app.get("/name", (req, res) => {
    res.send("Hello from Sahil :)");
});

app.get("/greeting", (req, res) => {
    res.send("Name:Sahil <br /> Student Number: n01697226");
});
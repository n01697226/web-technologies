import express from "express";

const app = express();

// const logger = (req) => {
//     console.log(req.url);
//     console.log(req.method);
//     console.log(Date());
// }

// app.get("/", (req, res) => {
//     logger(req);
//     res.send("This is the express server.");
// });

const logger = (req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    console.log(Date());
    next();
}

const newMiddleware = (req, res, next) => {
    console.log("hello");
    next();
}

app.use(logger); // throughout the lab

app.get("/", newMiddleware, logger, (req, res) => { // for specific route
    res.send("This is the express server.");
});

app.get("/login", (req, res) => {
    res.send("You are now loged in.");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
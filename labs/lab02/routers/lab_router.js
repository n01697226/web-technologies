import express from "express";
const router = express.Router();

router.get("/name", (req, res) => {
    res.send("Hello from Sahil :)");
});

router.get("/greeting", (req, res) => {
    res.send("Name:Sahil | Student Number: n01697226");
});

router.get("/add/:x/:y", (req, res) => {
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);
    res.send(`The sum of ${x} and ${y} is ${x+y}`);
});

router.get("/calculate/:a/:b/:operator", (req, res) => {
    let a = parseFloat(req.params.a);
    let b = parseFloat(req.params.b);
    let operator = req.params.operator;

    switch (operator) {
        case "+":
            return res.send(`The addition of ${a} and ${b} is ${a+b}`);
        case "-":
            return res.send(`The subtraction of ${a} and ${b} is ${a-b}`);
        case "*":
            return res.send(`The multiplication of ${a} and ${b} is ${a*b}`);
        case "/":
            if(b != 0 ) {
                return res.send(`The devision of ${a} and ${b} is ${a/b}`);
            } else {
                return res.send(`b can not be zero.`);
            } 
        default:
            break;
    }
});

export default router;``
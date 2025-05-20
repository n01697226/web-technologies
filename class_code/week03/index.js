import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, res)=> {
    res.send("Hello from the GET request");
});

app.post("/", (req, res)=> {
    res.send("Hello from the POST request");
});

app.put("/", (req, res)=> {
    res.send("Hello from the PUT request");
});

/* Domain: https://www.youtube.com
Endpoint: :/watch
? - Query
v=pAsmrKyMqaA
*/

app.get("/watch", (req, res) => {
    console.log(req.url);
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    res.send("You got to the watch endpoint");
});
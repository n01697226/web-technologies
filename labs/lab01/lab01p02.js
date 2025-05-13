import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const data = fs.readFileSync("./html/index.html");
    res.end(data);
  } else if (req.url === "/about") {
    const data = fs.readFileSync("./html/about.html");
    res.end(data);
  } else if (req.url === "/contact") {
    const data = fs.readFileSync("./html/contact.html");
    res.end(data);
  } else if (req.url === "/methods") {
    if (req.method === "GET") {
      res.end("Hello to the GET method");
    } else if (req.method === "POST") {
      res.end("Hello to the POST method");
    } else if (req.method === "PUT") {
      res.end("Hello to the PUT method");
    }
  } else {
    res.writeHead(404, "Page Not Found");
    res.end("404 page not found");
  }
});

server.listen(8000, () => {
  console.log(`http://localhost:8000`);
});

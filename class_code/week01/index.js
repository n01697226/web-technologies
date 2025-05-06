import http from 'node:http';

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  if(req.url == "/") {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello Home!',
    }));
  } else if (req.url == "/about") {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello About!',
    }));
  } else if (req.url == "/contact") {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello Contact!',
    }));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello Unknown!',
    }));
  }
});

server.listen(8000, () => {
    console.log("http://localhost:8000");
});
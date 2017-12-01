const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1308;

const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

const server = http.createServer((req, res) => {
  console.log(`${now()} request ${req.url}`);
  const html = fs.readFileSync('./views/index.ejs').toString();
  const rendered = html
    .replace('<%= title%>', 'Node & JavaScript')
    .replace('<%= content%>', 'This is one lesson about nodejs and javascript.');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(rendered);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

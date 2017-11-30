const http = require('http');
/**
 * use node library
 */
// const parse = require('url').parse;

const hostname = '127.0.0.1';
const port = 1308;

/**
 * parse url string to query object
 * @param {String} url 
 */
function parseQueryString(url) {
  const queryString = url.slice(url.indexOf('?') + 1);
  const params = queryString.split('&');
  const qs = {};
  params.forEach(param => {
    const keyValue = param.split('=');
    qs[keyValue[0]] = keyValue[1];
  });
  return qs;
}

const server = http.createServer((req, res) => {
  /**
   * simple way
   * const qs = parse(req.url, true).query;
   */
  const qs = parseQueryString(req.url);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello, ${qs.name || 'World'}!`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
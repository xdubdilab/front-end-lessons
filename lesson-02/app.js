const http = require('http');
const parse = require('url').parse;

const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

const App = () => {
  const routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
  
  const registerHandler = (method, route, handler) => {
    if (!routes[method]) {
      throw new Error(`${method} not supported!!!`);
    }
    routes[method][route] = handler;
  };

  const requestListener = (req, res) => {
    const url = parse(req.url, true);
    const { method } = req;
    const { pathname } = url;

    console.log(`[${now()}] - ${method} ${pathname}`);      
    
    const hasMapping = routes[method] && routes[method][pathname];
    if (hasMapping) {
      routes[method][pathname](req, res);
    } else {
      res.statusCode = 404;
      res.end();
    }
  };
  
  const start = (hostname, port) => {
    const server = http.createServer(requestListener);
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  };
  const get = (route, handler) => registerHandler('GET', route, handler);
  const post = (route, handler) => registerHandler('POST', route, handler);
  const put = (route, handler) => registerHandler('PUT', route, handler);
  const _delete = (route, handler) => registerHandler('DELETE', route, handler);

  return {
    start,
    get,
    post,
    put,
    delete: _delete,
  };
};

module.exports = App;

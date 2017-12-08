const http = require('http');
const parse = require('url').parse;
const fs = require('fs');

const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

const STATIC_PATH = 'static';
// imcomplete list of MIME Types
const MediaTypes = {
  JSON: 'application/json;charset=utf-8',
  JS: 'application/javascript',
  HTML: 'text/html',
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  CSS: 'text/css',
  TEXT_PLAIN: 'text/plain',
};

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

  const http500 = (res, err) => {
    res.statusCode = 500;
    res.end(err || 'Server Interal Error');
  };
  const http404 = (res) => {
    res.statusCode = 404;
    res.end();
  };
  const http20x = (res, contentType, statusCode) => {
    res.statusCode = statusCode || 200;
    res.setHeader('Content-Type', contentType);
  };

  // static resources handler, such as js/css/png/gif/jpeg/svg
  const staticHandler = (pathname, res) => {
    const path = STATIC_PATH + pathname;
    if (fs.stat(path, (err, stats) => {
      if (err) {
        return http404(res);
      }
      const result = pathname.match(/\.([^.]*$)/);
      let contentType = MediaTypes.TEXT_PLAIN;
      if (result && result.index > -1) {
        const suffix = result[1];
        const mime = MediaTypes[suffix.toUpperCase()];
        if (mime) {
          contentType = mime;
        }
      }
      fs.readFile(path, (err, data) => {
        if (err) {
          return http404(res);
        }
        http20x(res, contentType);
        res.end(data);
      });
    }));
  };

  const requestListener = (req, res) => {
    const url = parse(req.url, true);
    const { method } = req;
    const { pathname } = url;

    console.log(`[${now()}] - ${method} ${pathname}`);      
    
    const hasMapping = routes[method] && routes[method][pathname];
    if (hasMapping) {
      // handle request body
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(`request body:`, body);
        try {
          // default parse body to json
          req.body = JSON.parse(body);
        } catch (e) {
          // console.log(e);
          req.body = body;
        }
        routes[method][pathname](req, res);
      });
    } else if (method.toLowerCase() === 'get') {
      staticHandler(pathname, res);
    } else {
      http404(res);
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
  const del = (route, handler) => registerHandler('DELETE', route, handler);

  return {
    start,
    get,
    post,
    put,
    delete: del,
    http500,
    http404,
    http20x,
    MediaTypes,
  };
};

module.exports = App;

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1308;

const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

const retrieveProperty = (data, key) => {
  const hasNestedProperty = key.indexOf('.') > -1;
  if (hasNestedProperty) {
    const keys = key.split('.');
    let value = data[keys[0]];
    for (let i = 1, len = keys.length; i < len; i++) {
      if (!value) break;
      value = value[keys[i]];
    }
    return value || '';
  }
  return data[key] || '';
};

const render = (template, data) => {
  const params = template.match(/({{[^}]*}})/g).map(v => v.replace(/[{}]/g, ''));
  let html = template;
  params.forEach(v => {
    html = html.replace(`{{${v}}}`, retrieveProperty(data, v));
  });
  return html;
};

const server = http.createServer((req, res) => {
  console.log(`${now()} request ${req.url}`);

  const data = {
    title: 'Lesson 01',
    content: {
      head: 'A Simple Template',
      paragraph: 'Good artists copy; great artists steal — Pablo Picasso',
    },
  };
  const template = fs.readFileSync('./views/index.template').toString();
  const html = render(template, data);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

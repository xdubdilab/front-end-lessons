const fs = require('fs');
const path = require('path');
const App = require('./app');
const tasks = require('./data/tasks');

const HOST_NAME = '127.0.0.1';
const PORT = 1308;
const MEDIA = {
  APPLICATION_JSON: 'application/json;charset=utf-8',
  TEXT_HTML: 'text/html',
};

const jsonOf = (data) => JSON.stringify(data);

const app = App();

app.get('/', (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, 'views', 'index.html'));
  res.statusCode = 200;
  res.setHeader('Content-Type', MEDIA.TEXT_HTML);
  res.end(html);
});

app.get('/api/tasks', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', MEDIA.APPLICATION_JSON);
    res.end(jsonOf(tasks));
});

app.post('/api/tasks', (req, res) => {
  // TODO
});

app.start(HOST_NAME, PORT);

const fs = require('fs');
const path = require('path');
const App = require('./app');

const HOST_NAME = '127.0.0.1';
const PORT = 1308;
const TODOS_JSON = path.join(__dirname, 'data', 'todos.json');

const json2str = (data, indent) => JSON.stringify(data, null, indent || 0);
const saveTodos = todos => fs.writeFileSync(TODOS_JSON, json2str(todos, 2));
const readTodos = (callback, isRaw) => {
  fs.readFile(TODOS_JSON, (err, data) => {
    if (err) {
      return typeof callback === 'function' && callback(null, err);
    }
    let todos = data;
    if (!isRaw) {
      try {
        todos = JSON.parse(data);
      } catch (e) {
        // console.log(e);
        todos = [];
      }
    }
    typeof callback === 'function' && callback(todos);
  });
};

const app = App();
const { MediaTypes, http500, http404, http20x } = app;
const http20xJson = (res, statusCode) => {
  http20x(res, MediaTypes.JSON, statusCode);
};

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
    if (err) {
      return http404(res);
    }
    http20x(res, MediaTypes.HTML);
    res.end(data);
  });
});

app.get('/api/todos', (req, res) => {
  readTodos((todos, err) => {
    if (todos) {
      http20xJson(res);
      res.end(todos);
    } else {
      http500(res, err);
    }
  }, true);
});

app.post('/api/todos', (req, res) => {
  const todo = req.body;
  readTodos((todos, err) => {
    if (todos) {
      http20xJson(res, 201);
      todos.push(todo);
      saveTodos(todos);
      res.end(json2str(todo));
    } else {
      http500(res, err);
    }
  });
});

app.put('/api/todos', (req, res) => {
  const todo = req.body;
  readTodos((todos, err) => {
    if (todos) {
      http20xJson(res);
      const filtered = todos.filter(item => item.id === todo.id);
      if (filtered.length) {
        Object.assign(filtered[0], todo);
      }
      saveTodos(todos);
      res.end(json2str(todo));
    } else {
      http500(res, err);
    }
  });
});

app.delete('/api/todos', (req, res) => {
  const todo = req.body;
  readTodos((todos, err) => {
    if (todos) {
      http20xJson(res, 204);
      const filtered = todos.filter(item => item.id !== todo.id);
      saveTodos(filtered);
      res.end();
    } else {
      http500(res, err);
    }
  });
});

app.start(HOST_NAME, PORT);

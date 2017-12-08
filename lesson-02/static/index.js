;(() => {
  const request = (options) => {
    const _options = {
      method: 'GET',
      url: '',
      data: '',
      success: data => console.log(data),
      fail: (status, data) => console.log(status, data),
    };
    Object.assign(_options, options);

    const req = new XMLHttpRequest();
    const { method, url, success, fail, data } = _options;
    req.onreadystatechange = () => {
      const { readyState, status } = req;
      if (readyState === 4) {
        if (status >= 200 && status < 210) {
          typeof success === 'function' && success(req.responseText);
        } else {
          typeof fail === 'function' && fail(req.status, req.responseText);
        }
      }
    };
    req.open(method, url, true);
    req.send(data);
  };

  const services = {
    query: (success) => {
      request({
        url: '/api/todos',
        success,
      });
    },
    create: (todo, success) => {
      request({
        method: 'post',
        url: '/api/todos',
        data: JSON.stringify(todo),
        success,
      });
    },
    put: (todo, success) => {
      request({
        method: 'put',
        url: '/api/todos',
        data: JSON.stringify(todo),
        success,
      });
    },
    delete: (todo, success) => {
      request({
        method: 'delete',
        url: '/api/todos',
        data: JSON.stringify(todo),
        success,
      });
    },
  };

  const todoApp = document.querySelector('.todo-app');
  const newTodoInput = todoApp.querySelector('.new-todo');
  const todoList = todoApp.querySelector('.todo-list');
  const todoTpl = todoApp.querySelector('#todo-template');

  const addTodo = (todo) => {
    const newTodo = todoTpl.cloneNode(true); // deep clone
    newTodo.id = '';
    const label = newTodo.querySelector('label');
    label.innerHTML = todo.name;
    const checkbox = newTodo.querySelector('.toggle');
    if (todo.status) {
      setTimeout(() => checkbox.click(), 100);
    }
    checkbox.addEventListener('change', (e) => {
      if (checkbox.checked) {
        newTodo.className += ' completed';
      } else {
        newTodo.className = newTodo.className.replace(' completed', '');
      }
      if (checkbox.checked ^ todo.status) { // todo status changed, sync with server
        todo.status = Number(checkbox.checked); // 0: unfinished, 1: finished
        services.put(todo);
      }
    });
    const destroyButton = newTodo.querySelector('.destroy');
    destroyButton.addEventListener('click', (e) => {
      services.delete(todo, () => todoList.removeChild(newTodo));
    });
    todoList.appendChild(newTodo);
  };

  const initialize = () => {
    newTodoInput.focus();

    newTodoInput.addEventListener('keydown', (e) => {
      const ENTER_KEY = 13;
      const value = newTodoInput.value;
      if (e.keyCode !== ENTER_KEY || !value) {
        return;
      }
      services.create({
        id: new Date().getTime(),
        name: value,
        status: 0,
      }, (data) => {
        const todo = JSON.parse(data);
        addTodo(todo);
      });
      newTodoInput.value = '';
      newTodoInput.focus();
    });

    services.query((data) => {
      try {
        const todos = JSON.parse(data);
        todos.forEach(todo => addTodo(todo));
      } catch (e) {
        console.log(e);
      }
    });
  };

  initialize();
})();
const soap = require('strong-soap').soap;
const http = require('http');
const fs = require('fs');

const wsdl = 'todo.wsdl';

// An in-memory store for our Todo tasks
let todoStore = [];
let id = 1;

const serviceObject = {
  TodoService: {
    TodoPort: {
      createTodo: function (args, callback) {
        todoStore.push({ ...args, id });
        id++;
        callback({
          result: 'Todo added successfully!',
        });
      },
      readTodo: function (args, callback) {
        callback({
          result: todoStore.find((todo) => todo.id === +args.id),
        });
      },
      updateTodo: function (args, callback) {
        const todoToUpdate = todoStore.find((todo) => todo.id === +args.id);

        todoToUpdate = { ...todoToUpdate, ...args };
        callback({
          result: 'Todo updated successfully!',
        });
      },
      deleteTodo: function (args, callback) {
        todoStore = todoStore.filter((todo) => todo.id !== +args.id);
        callback({
          result: 'Todo deleted successfully!',
        });
      },
    },
  },
};

const xml = fs.readFileSync(wsdl, 'utf8');

const server = http.createServer(function (request, response) {
  response.end('404: Not Found: ' + request.url);
});

server.listen(3000);
soap.listen(server, '/todo', serviceObject, xml);

console.log(
  'SOAP ToDo service started and listening on http://localhost:3000/todo'
);

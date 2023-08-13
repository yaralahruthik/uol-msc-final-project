// server.js

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './service/todo.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const todo_proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let todos = [];

let idCount = 0;

server.addService(todo_proto.TodoService.service, {
  ListTodos: (_, callback) => {
    callback(null, { todos });
  },
  GetTodo: (call, callback) => {
    let todo = todos.find((t) => t.id === call.request.id);
    if (todo) {
      callback(null, todo);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found',
      });
    }
  },
  AddTodo: (call, callback) => {
    let todo = {
      id,
      task: call.request.task,
    };
    todos.push(todo);
    id++;
    callback(null, todo);
  },
  UpdateTodo: (call, callback) => {
    let existingTodo = todos.find((t) => t.id === call.request.id);
    if (existingTodo) {
      existingTodo.task = call.request.task;
      callback(null, existingTodo);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found',
      });
    }
  },
  DeleteTodo: (call, callback) => {
    let index = todos.findIndex((t) => t.id === call.request.id);
    if (index !== -1) {
      todos.splice(index, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found',
      });
    }
  },
});

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:50051');
server.start();

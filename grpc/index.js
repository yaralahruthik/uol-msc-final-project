// server.js

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './todo.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const todo_proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let todos = [{ id: 1, task: 'Learn gRPC' }];

let idCount = todos.length;

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
      id: ++idCount,
      task: call.request.task,
      completed: false,
    };
    todos.push(todo);
    callback(null, todo);
  },
  UpdateTodo: (call, callback) => {
    let existingTodo = todos.find((t) => t.id === call.request.id);
    if (existingTodo) {
      existingTodo.task = call.request.task;
      existingTodo.completed = call.request.completed;
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

// resolvers.js
let todos = [{ id: 1, task: 'Learn GraphQL' }];

let idCount = todos.length;

const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_, { id }) => todos.find((todo) => todo.id === id),
  },
  Mutation: {
    addTodo: (_, { task }) => {
      const todo = { id: ++idCount, task };
      todos.push(todo);
      return todo;
    },
    updateTodo: (_, { id, task, completed }) => {
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (task !== undefined) {
        todos[todoIndex].task = task;
      }
      return todos[todoIndex];
    },
    deleteTodo: (_, { id }) => {
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex > -1) {
        const [deletedTodo] = todos.splice(todoIndex, 1);
        return deletedTodo;
      }
      return null;
    },
  },
};

module.exports = resolvers;

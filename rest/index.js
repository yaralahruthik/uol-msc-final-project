const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let todos = [];
let id = 0;

// Middleware to parse JSON requests
app.use(bodyParser.json());

const PORT = 3000;

app.post('/todos', (req, res) => {
  const newTodo = {
    id, // simple way to generate unique IDs
    title: req.body.title,
  };

  todos.push(newTodo);
  id++;
  res.status(201).json(newTodo);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((todo) => todo.id === req.params.id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    ...req.body,
  };

  todos[todoIndex] = updatedTodo;

  res.json(updatedTodo);
});

app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((todo) => todo.id === req.params.id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

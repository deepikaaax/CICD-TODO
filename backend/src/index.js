const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => res.json(todos));
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const item = { id: Date.now(), title, done: false };
  todos.push(item);
  return res.status(201).json(item);
});

app.listen(4000, () => console.log('Backend listening on port 4000'));

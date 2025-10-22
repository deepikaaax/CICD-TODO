import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => { fetchTodos(); }, []);
  async function fetchTodos(){
    const r = await axios.get('/api/todos');
    setTodos(r.data);
  }
  async function add(){
    if(!text) return;
    await axios.post('/api/todos', { title: text });
    setText('');
    fetchTodos();
  }
  return (
    <div style={{ padding:20 }}>
      <h1>To-Do</h1>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="New task" />
      <button onClick={add}>Add</button>
      <ul>{todos.map(t=> <li key={t.id}>{t.title}</li>)}</ul>
    </div>
  );
}

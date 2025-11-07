import React, { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [due, setDue] = useState('')
  const [priority, setPriority] = useState('medium')

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    const task = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: title.trim(),
      createdAt: new Date().toISOString(),
      due: due ? `${due}T00:00:00` : null,
      priority,
      done: false,
      notes: ''
    }
    onAdd(task)
    setTitle(''); setDue(''); setPriority('medium')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-100 focus:outline-none"
      />

      <div className="flex gap-3">
        <input type="date" value={due} onChange={e => setDue(e.target.value)} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" />
        <select value={priority} onChange={e => setPriority(e.target.value)} className="w-32 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">Priority helps you focus</div>
        <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:opacity-95">Add Task</button>
      </div>
    </form>
  )
}

import React, { useEffect, useState } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

const STORAGE_KEY = 'pretty_todo.tasks_v1'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all') // all / active / completed / overdue
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('pretty_todo.dark')
    if (stored !== null) return JSON.parse(stored)
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setTasks(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('pretty_todo.dark', JSON.stringify(dark))
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  function addTask(task) {
    setTasks(prev => [task, ...prev])
  }
  function updateTask(id, patch) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
  }
  function removeTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-8">
      <div className="container mx-auto px-6">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Pretty Todo</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Simple, beautiful tasks — stored locally</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-72 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">Clear</button>
              )}
            </div>

            <button
              onClick={() => setDark(d => !d)}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 card-shadow border border-gray-100 dark:border-gray-700"
              title="Toggle theme"
            >
              {dark ? <SunIcon className="w-5 h-5 text-yellow-300" /> : <MoonIcon className="w-5 h-5 text-gray-800" />}
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow border border-transparent dark:border-gray-700">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tasks</h2>
              <div className="flex gap-2 text-sm items-center">
                <button className={`control-pill ${filter==='all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setFilter('all')}>All</button>
                <button className={`control-pill ${filter==='active' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setFilter('active')}>Active</button>
                <button className={`control-pill ${filter==='completed' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setFilter('completed')}>Completed</button>
                <button className={`control-pill ${filter==='overdue' ? 'bg-red-100 text-red-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setFilter('overdue')}>Overdue</button>
              </div>
            </div>

            <TaskList
              tasks={tasks}
              onToggle={(id, done) => updateTask(id, { done })}
              onDelete={removeTask}
              onEdit={(id, patch) => updateTask(id, patch)}
              query={query}
              filter={filter}
            />
          </section>

          <aside className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow border border-transparent dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Add Task</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">Fast & local</span>
            </div>

            <TaskForm onAdd={addTask} />

            <footer className="mt-6 text-xs text-gray-500 dark:text-gray-400">Data stored in your browser only • Export later</footer>
          </aside>
        </main>
      </div>
    </div>
  )
}

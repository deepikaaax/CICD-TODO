import React, { useMemo } from 'react'
import TaskCard from './TaskCard'
import { isPast, parseISO } from 'date-fns'

export default function TaskList({ tasks, onToggle, onDelete, onEdit, query, filter }) {
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return tasks
      .filter(t => {
        if (q && !(`${t.title} ${t.notes || ''}`.toLowerCase().includes(q))) return false
        if (filter === 'active') return !t.done
        if (filter === 'completed') return t.done
        if (filter === 'overdue') return t.due && !t.done && isPast(parseISO(t.due))
        return true
      })
      .sort((a,b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0))
  }, [tasks, query, filter])

  if (filtered.length === 0) return (
    <div className="py-12 text-center text-gray-500 dark:text-gray-400">
      <div className="inline-block px-6 py-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
        <p className="mb-2 font-medium">No tasks yet</p>
        <p className="text-sm">Use the form on the right to add a task — it will appear here.</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-3">
      {filtered.map(task => (
        <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

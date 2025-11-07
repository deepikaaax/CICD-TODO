import React, { useState } from 'react'
import { format, parseISO, isPast } from 'date-fns'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [notes, setNotes] = useState(task.notes || '')

  const overdue = task.due ? (isPast(parseISO(task.due)) && !task.done) : false
  const dueLabel = task.due ? format(parseISO(task.due), 'MMM dd') : null

  function saveNotes() {
    onEdit(task.id, { notes })
    setEditing(false)
  }

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0 mt-1">
        <label className={`inline-flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer ${task.done ? 'bg-indigo-600' : 'bg-white border border-gray-200 dark:border-gray-600'}`}>
          <input className="hidden" type="checkbox" checked={task.done} onChange={e => onToggle(task.id, e.target.checked)} />
          {task.done ? <CheckIcon className="w-5 h-5 text-white"/> : <div className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-600" />}
        </label>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`text-md font-semibold ${task.done ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>{task.title}</h3>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded-full text-xs ${task.priority==='high' ? 'bg-red-100 text-red-700' : task.priority==='medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{task.priority}</span>

              {dueLabel && <span className={`px-2 py-0.5 rounded-full text-xs ${overdue ? 'bg-red-100 text-red-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}>Due {dueLabel}</span>}

              {task.createdAt && <span className="text-gray-400 text-xs"> • added {format(parseISO(task.createdAt), 'MMM d')}</span>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setEditing(s => !s)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" title="Edit notes">
              <PencilSquareIcon className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
            </button>
            <button onClick={() => onDelete(task.id)} className="p-2 rounded-md hover:bg-red-50" title="Delete">
              <TrashIcon className="w-5 h-5 text-red-500"/>
            </button>
          </div>
        </div>

        {editing ? (
          <div className="mt-3">
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700" rows={3} />
            <div className="flex gap-2 mt-2 justify-end">
              <button onClick={() => setEditing(false)} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700">Cancel</button>
              <button onClick={saveNotes} className="px-3 py-1 rounded-lg bg-indigo-600 text-white">Save</button>
            </div>
          </div>
        ) : (
          task.notes && <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{task.notes}</p>
        )}
      </div>
    </div>
  )
}

"use client"

import React, { useState } from 'react'
import Modal from './Modal'
import TaskForm from './TaskForm'

type Task = any

export default function NewTaskModal({ isOpen, onClose, onCreated }: { isOpen: boolean; onClose: () => void; onCreated: (t: Task) => void }) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (values: { title: string; description: string; priority: string; status: string; dueDate: string }) => {
    setSaving(true)
    setError(null)
    try {
      const body = { ...values, dueDate: values.dueDate || null }
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const b = await res.json().catch(() => ({}))
        setError(b?.error || 'Failed to create task')
        setSaving(false)
        return
      }
      const created = await res.json()
      onCreated(created)
    } catch (err) {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Task">
      <TaskForm initial={{}} onSubmit={handleSubmit} submitLabel="Create" submitting={saving} onCancel={onClose} />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </Modal>
  )
}

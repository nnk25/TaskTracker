import React from 'react'
import TaskDashboard from '../components/organisms/TaskDashboard/TaskDashboard'
import TaskTableOrganism from '../components/organisms/TaskTable/TaskTable'

export default function TasksPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
        <TaskDashboard />
        <TaskTableOrganism />
      </div>
    </div>
  )
}

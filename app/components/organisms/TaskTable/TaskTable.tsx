"use client";

import React, { useEffect, useState } from "react";
import TaskRow from "../../molecules/TaskRow";
import Button from "../../atoms/Button";
import EditTaskModal from "../../molecules/EditTaskModal";
import NewTaskModal from "../../molecules/NewTaskModal";

// Exported so you can import it in TaskRow, EditTaskModal, etc.
export interface Task {
  id: number | string;
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  due?: string;
}

export default function TaskTableOrganism() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);
  const [showNew, setShowNew] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tasks", { credentials: "same-origin" });
      if (res.status === 401) {
        setError("Not authenticated. Please sign in.");
        setTasks([]);
      } else if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body?.error || "Failed to load tasks");
      } else {
        const data = (await res.json()) as Task[];
        setTasks(data || []);
      }
    } catch (err: unknown) {
      // Explicitly typed as unknown to prevent implicit 'any'
      console.error("Failed to fetch tasks:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this task?")) return;
    try {
      const res = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        alert(body?.error || "Delete failed");
        return;
      }
      setTasks((t) => t.filter((x) => Number(x.id) !== Number(id)));
    } catch (err: unknown) {
      console.error("Failed to delete task:", err);
      alert("Network error");
    }
  };

  const handleUpdated = (updated: Task) => {
    setTasks((list) =>
      list.map((t) => (Number(t.id) === Number(updated.id) ? updated : t)),
    );
    setEditing(null);
  };

  const handleCreated = (created: Task) => {
    setTasks((list) => [created, ...list]);
    setShowNew(false);
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-green-600 px-4 py-2"
          onClick={() => setShowNew(true)}
        >
          New Task
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Due</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                // Explicitly typed parameters prevent upstream 'any' bleeding
                onEdit={(t: Task) => setEditing(t)}
                onDelete={(id: number) => {
                  void handleDelete(id);
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditTaskModal
          task={editing}
          onClose={() => setEditing(null)}
          onUpdated={handleUpdated}
        />
      )}
      <NewTaskModal
        isOpen={showNew}
        onClose={() => setShowNew(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

type Task = any;

export default function EditTaskModal({
  task,
  onClose,
  onUpdated,
}: {
  task: Task;
  onClose: () => void;
  onUpdated: (t: Task) => void;
}) {
  const [saving, setSaving] = useState(false);

  const submit = async (values: {
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
  }) => {
    setSaving(true);
    try {
      const body = { id: task.id, ...values, dueDate: values.dueDate || null };
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "same-origin",
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        alert(b?.error || "Update failed");
        setSaving(false);
        return;
      }
      const updated = await res.json();
      onUpdated(updated);
    } catch (err) {
      alert("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Task">
      <TaskForm
        initial={{
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().slice(0, 10)
            : "",
        }}
        onSubmit={submit}
        submitLabel="Save"
        submitting={saving}
        onCancel={onClose}
      />
    </Modal>
  );
}

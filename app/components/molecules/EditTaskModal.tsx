"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import type { TaskModel } from "../../generated/prisma/models/Task";

export default function EditTaskModal({
  task,
  onClose,
  onUpdated,
}: Readonly<{
  task: TaskModel;
  onClose: () => void;
  onUpdated: (t: TaskModel) => void;
}>) {
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
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        alert(b?.error || "Update failed");
        setSaving(false);
        return;
      }
      const updated = (await res.json()) as TaskModel;
      onUpdated(updated);
    } catch (err) {
      // handle and surface the error
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg || "Network error");
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

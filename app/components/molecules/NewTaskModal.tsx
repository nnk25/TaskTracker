"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

import type { TaskModel } from "../../generated/prisma/models/Task";

export default function NewTaskModal({
  isOpen,
  onClose,
  onCreated,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  onCreated: (t: TaskModel) => void;
}>) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const submit = async (values: {
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
  }) => {
    setSaving(true);
    setError(null);
    try {
      const body = { ...values, dueDate: values.dueDate || null };
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        alert(b?.error || "Create failed");
        setSaving(false);
        return;
      }
      const created = (await res.json()) as TaskModel;
      onCreated(created);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg || "Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Task">
      <TaskForm
        onSubmit={submit}
        submitLabel="Create"
        submitting={saving}
        onCancel={onClose}
      />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
import Select from "../atoms/Select";

type Values = {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
};

type Props = {
  initial?: Partial<Values>;
  onSubmit: (values: Values) => void | Promise<void>;
  submitLabel?: string;
  submitting?: boolean;
  onCancel?: () => void;
};

export default function TaskForm({
  initial = {},
  onSubmit,
  submitLabel = "Save",
  submitting = false,
  onCancel,
}: Readonly<Props>) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [priority, setPriority] = useState(initial.priority || "MEDIUM");
  const [status, setStatus] = useState(initial.status || "TODO");
  const [dueDate, setDueDate] = useState(initial.dueDate || "");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    void onSubmit({ title, description, priority, status, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label className="block text-sm">Title</Label>
        <Input
          required
          className="mt-1 w-full border px-2 py-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <Label className="block text-sm">Description</Label>
        <Textarea
          className="mt-1 w-full border px-2 py-1 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label className="block text-sm">Priority</Label>
          <Select
            className="mt-1 w-full border px-2 py-1 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </Select>
        </div>
        <div>
          <Label className="block text-sm">Status</Label>
          <Select
            className="mt-1 w-full border px-2 py-1 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>TODO</option>
            <option>IN_PROGRESS</option>
            <option>DONE</option>
          </Select>
        </div>
        <div>
          <Label className="block text-sm">Due</Label>
          <Input
            type="date"
            className="mt-1 w-full border px-2 py-1 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        {onCancel && (
          <button
            type="button"
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded"
          disabled={submitting}
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

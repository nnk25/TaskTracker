"use client";

import React from "react";
import Button from "../atoms/Button";
import type { Task as TaskModel } from "@/app/generated/prisma/client";

type Props = {
  task: TaskModel;
  onEdit: (t: TaskModel) => void;
  onDelete: (id: number) => void;
};

export default function TaskRow({ task, onEdit, onDelete }: Readonly<Props>) {
  return (
    <tr className="border-t">
      <td className="px-4 py-2">{task.title}</td>
      <td className="px-4 py-2">{task.description ?? ""}</td>
      <td className="px-4 py-2">{task.priority}</td>
      <td className="px-4 py-2">{task.status}</td>
      <td className="px-4 py-2">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
      </td>
      <td className="px-4 py-2 text-center">
        <Button
          variant="primary"
          className="mr-2 px-3 py-1"
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          className="px-3 py-1"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

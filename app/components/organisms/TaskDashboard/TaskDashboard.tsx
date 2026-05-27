"use client";

import React, { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  dueDate?: string | null;
  status?: string | null;
};

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");

        // Typed the parsed JSON to remove the implicit `any`
        const data = (await res.json()) as Task[];
        if (mounted) setTasks(data);
      } catch (err: unknown) {
        // Narrowed the unknown type to safely access the error message
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load tasks");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // Explicitly marked the promise as ignored
    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "DONE").length;
  const pending = tasks.filter((t) => t.status !== "DONE").length;
  const now = new Date();
  const overdue = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "DONE",
  );

  // Extracted logic to resolve the nested conditional warning
  const renderOverdueTasks = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (overdue.length === 0) {
      return <div className="text-sm text-gray-500">No overdue tasks</div>;
    }

    return (
      <ul className="space-y-2">
        {overdue.map((t) => (
          <li key={t.id} className="p-3 border rounded bg-red-50">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{t.title}</div>
                {t.dueDate && (
                  <div className="text-sm text-gray-600">
                    Due {new Date(t.dueDate).toLocaleString()}
                  </div>
                )}
              </div>
              <div className="text-sm text-red-600 font-semibold">Overdue</div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="flex gap-4 mb-4">
        <div className="p-3 bg-gray-100 rounded shadow-sm">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-lg font-bold">{total}</div>
        </div>
        <div className="p-3 bg-gray-100 rounded shadow-sm">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-lg font-bold">{completed}</div>
        </div>
        <div className="p-3 bg-gray-100 rounded shadow-sm">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-lg font-bold">{pending}</div>
        </div>
        <div className="p-3 bg-gray-100 rounded shadow-sm">
          <div className="text-sm text-gray-500">Overdue</div>
          <div className="text-lg font-bold text-red-600">{overdue.length}</div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Overdue Tasks</h3>
        {renderOverdueTasks()}
      </div>
    </section>
  );
}

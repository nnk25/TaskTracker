import React from "react";
import TaskDashboard from "../components/organisms/TaskDashboard/TaskDashboard";
import TaskTableOrganism from "../components/organisms/TaskTable/TaskTable";
import AuthButton from "../components/molecules/AuthButton";
import { SessionProvider } from "next-auth/react";

export default function TasksPage() {
  return (
    <SessionProvider>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <AuthButton />
          </div>
          <TaskDashboard />
          <TaskTableOrganism />
        </div>
      </div>
    </SessionProvider>
  );
}

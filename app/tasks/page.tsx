import React from "react";
import TaskDashboard from "../components/organisms/TaskDashboard/TaskDashboard";
import TaskTableOrganism from "../components/organisms/TaskTable/TaskTable";
import AuthButton from "../components/molecules/AuthButton";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function TasksPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  return (
    <SessionProvider session={session}>
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

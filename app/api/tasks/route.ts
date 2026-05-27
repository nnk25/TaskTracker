import { NextResponse } from "next/server";
import * as taskService from "@/services/taskService";
import { auth } from "@/auth";

// Define a safe type for incoming JSON bodies to prevent 'unsafe-assignment'
type TaskRequestBody = {
  id?: number | string;
  title?: string;
  userId?: string;
} & Record<string, unknown>;

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const userId = url.searchParams.get("userId");

    if (id) {
      const task = await taskService.getTaskById(Number(id));
      if (!task)
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      if (String(task.userId) !== String(session.user.id))
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      return NextResponse.json(task);
    }

    if (userId) {
      if (String(userId) !== String(session.user.id))
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      const tasks = await taskService.getTasksByUserId(userId);
      return NextResponse.json(tasks);
    }

    const tasks = await taskService.getTasksByUserId(String(session.user.id));
    return NextResponse.json(tasks);
  } catch (err: unknown) {
    console.error("Failed to fetch tasks:", err); // Fixes ignored exception & unused var
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Safely typecast the incoming JSON payload
    const body = (await req.json()) as TaskRequestBody;
    if (!body?.title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    body.userId = String(session.user.id);

    // Infer the exact argument type from the service function to guarantee safety
    const created = await taskService.createTask(
      body as Parameters<typeof taskService.createTask>[0],
    );
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as TaskRequestBody;
    const id = body?.id ?? null;
    if (!id)
      return NextResponse.json({ error: "Missing task id" }, { status: 400 });

    const existing = await taskService.getTaskById(Number(id));
    if (!existing)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    if (String(existing.userId) !== String(session.user.id))
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const updated = await taskService.updateTask(Number(id), body);
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { error: "Missing id query parameter" },
        { status: 400 },
      );

    const existing = await taskService.getTaskById(Number(id));
    if (!existing)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    if (String(existing.userId) !== String(session.user.id))
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const deleted = await taskService.deleteTask(Number(id));
    return NextResponse.json(deleted);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

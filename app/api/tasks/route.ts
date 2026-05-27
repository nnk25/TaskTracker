import { NextResponse } from 'next/server'
import * as taskService from '@/services/taskService'
import { auth } from '@/auth'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const userId = url.searchParams.get('userId')

    if (id) {
      const task = await taskService.getTaskById(Number(id))
      if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })
      if (String(task.userId) !== String(session.user.id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      return NextResponse.json(task)
    }

    if (userId) {
      if (String(userId) !== String(session.user.id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      const tasks = await taskService.getTasksByUserId(userId)
      return NextResponse.json(tasks)
    }

    const tasks = await taskService.getTasksByUserId(String(session.user.id))
    return NextResponse.json(tasks)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    if (!body?.title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 })
    }
    body.userId = String(session.user.id)
    const created = await taskService.createTask(body)
    return NextResponse.json(created, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    const id = body?.id ?? null
    if (!id) return NextResponse.json({ error: 'Missing task id' }, { status: 400 })
    const existing = await taskService.getTaskById(Number(id))
    if (!existing) return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    if (String(existing.userId) !== String(session.user.id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    const updated = await taskService.updateTask(Number(id), body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id query parameter' }, { status: 400 })
    const existing = await taskService.getTaskById(Number(id))
    if (!existing) return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    if (String(existing.userId) !== String(session.user.id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    const deleted = await taskService.deleteTask(Number(id))
    return NextResponse.json(deleted)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 })
  }
}

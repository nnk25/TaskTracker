import { NextResponse } from 'next/server'
import * as taskService from '@/services/taskService'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const userId = url.searchParams.get('userId')

    if (id) {
      const task = await taskService.getTaskById(Number(id))
      if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })
      return NextResponse.json(task)
    }

    if (userId) {
      const tasks = await taskService.getTasksByUserId(userId)
      return NextResponse.json(tasks)
    }

    return NextResponse.json({ error: 'Provide `id` or `userId` query parameter' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body?.title || !body?.userId) {
      return NextResponse.json({ error: 'Missing title or userId' }, { status: 400 })
    }
    const created = await taskService.createTask(body)
    return NextResponse.json(created, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const id = body?.id ?? null
    if (!id) return NextResponse.json({ error: 'Missing task id' }, { status: 400 })
    const updated = await taskService.updateTask(Number(id), body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id query parameter' }, { status: 400 })
    const deleted = await taskService.deleteTask(Number(id))
    return NextResponse.json(deleted)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 })
  }
}

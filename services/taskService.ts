import prisma from "../lib/prisma"
import type { Prisma, Task } from "@/app/generated/prisma/client"
import type { CreateTaskInput, UpdateTaskInput, Priority, Status } from "@/types/task"

export async function createTask(data: CreateTaskInput): Promise<Task> {
	const { title, description, priority, status, dueDate, userId } = data
	return prisma.task.create({
		data: {
			title,
			description: description ?? null,
			priority: priority ?? undefined,
			status: status ?? undefined,
			dueDate: dueDate ? new Date(dueDate) : null,
			userId,
		},
	})
}

export async function getTaskById(id: number): Promise<Task | null> {
	return prisma.task.findUnique({ where: { id } })
}

export async function getTasksByUserId(
	userId: string,
	options?: {
		status?: Status
		priority?: Priority
		search?: string
		skip?: number
		take?: number
		orderBy?: { field: 'dueDate' | 'createdAt' | 'updatedAt'; direction: 'asc' | 'desc' }
	}
): Promise<Task[]> {
	const where: any = { userId }
	if (options?.status) where.status = options.status
	if (options?.priority) where.priority = options.priority
	if (options?.search) {
		where.OR = [
			{ title: { contains: options.search, mode: 'insensitive' } },
			{ description: { contains: options.search, mode: 'insensitive' } },
		]
	}

	const order: Prisma.TaskOrderByWithRelationInput = options?.orderBy
		? { [options.orderBy.field]: options.orderBy.direction }
		: { dueDate: 'asc' }

	return prisma.task.findMany({
		where,
		skip: options?.skip,
		take: options?.take,
		orderBy: order,
	})
}

export async function updateTask(id: number, data: UpdateTaskInput): Promise<Task> {
	const payload: any = { ...data }
	if (data.dueDate !== undefined) payload.dueDate = data.dueDate ? new Date(data.dueDate as any) : null
	return prisma.task.update({ where: { id }, data: payload })
}

export async function deleteTask(id: number): Promise<Task> {
	return prisma.task.delete({ where: { id } })
}

export async function changeTaskStatus(id: number, status: Status): Promise<Task> {
	return prisma.task.update({ where: { id }, data: { status } })
}

export async function changeTaskPriority(id: number, priority: Priority): Promise<Task> {
	return prisma.task.update({ where: { id }, data: { priority } })
}

export async function getOverdueTasks(userId: string): Promise<Task[]> {
	const now = new Date()
	return prisma.task.findMany({ where: { userId, dueDate: { lt: now }, status: { not: 'DONE' } } })
}

export async function getTasksDueWithinDays(userId: string, days = 7): Promise<Task[]> {
	const now = new Date()
	const then = new Date(now)
	then.setDate(now.getDate() + days)
	return prisma.task.findMany({ where: { userId, dueDate: { gte: now, lte: then } } })
}

export async function countTasksByStatus(userId: string) {
	const counts = await prisma.task.groupBy({
		by: ['status'],
		where: { userId },
		_count: { status: true },
	})
	return counts.reduce((acc: Record<string, number>, c) => {
		acc[c.status] = c._count.status
		return acc
	}, {})
}

export default {
	createTask,
	getTaskById,
	getTasksByUserId,
	updateTask,
	deleteTask,
	changeTaskStatus,
	changeTaskPriority,
	getOverdueTasks,
	getTasksDueWithinDays,
	countTasksByStatus,
}


import type { Priority, Status } from "@/app/generated/prisma/client"

export type CreateTaskInput = {
  title: string
  description?: string | null
  priority?: Priority
  status?: Status
  dueDate?: Date | string | null
  userId: string
}

export type UpdateTaskInput = Partial<Omit<CreateTaskInput, 'userId'>>

export type { Priority, Status }

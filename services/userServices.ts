
import prisma from "../lib/prisma"
import type { User } from "@/app/generated/prisma/client"

export async function getUserById(id: string, includeTasks = false): Promise<User | null> {
	return prisma.user.findUnique({
		where: { id },
		include: includeTasks ? { tasks: true } : undefined,
	})
}

export default { getUserById }


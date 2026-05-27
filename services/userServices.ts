import prisma from "@/lib/prisma";

export async function getUser(username: string) {
    const user = await prisma.user.findUnique({
        where: {username: username}
    })
    if(!user) return null
    return {
        id: user.id,
        username: user.username,
        password: user.password
    }
}
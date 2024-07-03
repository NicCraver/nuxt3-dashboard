import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const method = event.req.method

    switch (method) {
        case 'GET': {
            const query = getQuery(event)
            if (query.id) {
                return await prisma.gPTUser.findUnique({
                    where: { id: query.id as string },
                })
            }
            return await prisma.gPTUser.findMany({
                orderBy: [
                    {
                        type: 'asc', // 先按 type 升序排序，可以改为 'desc' 进行降序排序
                    },
                    {
                        state: 'asc', // 再按 state 升序排序，可以改为 'desc' 进行降序排序
                    },
                ],
            })
        }
        case 'POST': {
            const newUser = await readBody(event)
            return await prisma.gPTUser.create({ data: newUser })
        }
        case 'PUT': {
            const updateUser = await readBody(event)
            updateUser.updatedAt = new Date()  // Update the updatedAt field with the current timestamp
            return await prisma.gPTUser.update({
                where: { id: updateUser.id },
                data: updateUser,
            })
        }
        case 'DELETE': {
            const deleteUser = await readBody(event)
            return await prisma.gPTUser.delete({
                where: { id: deleteUser.id },
            })
        }
        default:
            return { error: 'Method not allowed' }
    }
})

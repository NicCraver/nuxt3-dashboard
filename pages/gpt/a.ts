'use server'
import { PrismaClient } from '@prisma/client'
// import { revalidatePath } from 'next/cache'
import { db } from '~/db/db'

// const prisma = new PrismaClient()

export async function getUser() {
  console.log(`1111111`, db.gPTUser)
  try {
    const userList = await db.gPTUser.findMany({
      orderBy: [
        {
          type: 'asc', // 先按 type 升序排序，可以改为 'desc' 进行降序排序
        },
        {
          state: 'asc', // 再按 state 升序排序，可以改为 'desc' 进行降序排序
        },
      ],
    })
    console.log(`userList`, userList)
    return userList
  }
  catch (ex) {
    return null
  }
}

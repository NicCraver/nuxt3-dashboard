import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testKeyword = 'test@test.com'

describe('gPTUser API', () => {
  let userId: string

  beforeAll(async () => {
    await prisma.gPTUser.deleteMany({ where: { account: { contains: testKeyword } } }) // 清空测试数据
  })

  afterAll(async () => {
    await prisma.gPTUser.deleteMany({ where: { account: { contains: testKeyword } } }) // 清空测试数据
    await prisma.$disconnect()
  })

  it('should create a user', async () => {
    const user = await prisma.gPTUser.create({
      data: {
        name: 'John Doe',
        account: `john.doe+${testKeyword}`,
        password: 'password123',
        type: 'admin',
        state: 'active',
      },
    })
    userId = user.id
    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John Doe')
  })

  it('should get a user', async () => {
    const user = await prisma.gPTUser.findUnique({
      where: { id: userId },
    })
    expect(user).toHaveProperty('id', userId)
  })

  it('should update a user', async () => {
    const updatedUser = await prisma.gPTUser.update({
      where: { id: userId },
      data: {
        name: 'Jane Doe',
      },
    })
    expect(updatedUser.name).toBe('Jane Doe')
  })

  it('should delete a user', async () => {
    const deletedUser = await prisma.gPTUser.delete({
      where: { id: userId },
    })
    expect(deletedUser.id).toBe(userId)
  })
})

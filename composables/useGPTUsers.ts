// composables/useFetchUser.ts
import type { GPTUser } from '~/types/api'

// // 定义 API 响应类型
// interface FetchUserResponse {
//   user?: GPTUser
//   users?: GPTUser[]
//   error?: string
// }

export function useFetchUser() {
  // 获取所有用户
  const getAllUsers = async (): Promise<GPTUser[]> => {
    try {
      const users: GPTUser[] = await $fetch('/api/gpt-user')
      // console.log(`users`, users)
      return users
    }
    catch (error) {
      console.error('Failed to fetch users', error)
      throw new Error('Failed to fetch users')
    }
  }

  // 获取单个用户
  const getUserById = async (id: string): Promise<GPTUser> => {
    try {
      const user: GPTUser = await $fetch(`/api/gpt-user?id=${id}`)
      return user
    }
    catch (error) {
      console.error(`Failed to fetch user with id ${id}`, error)
      throw new Error(`Failed to fetch user with id ${id}`)
    }
  }

  // 创建新用户
  const createUser = async (newUser: Partial<GPTUser>): Promise<GPTUser> => {
    try {
      const user: GPTUser = await $fetch('/api/gpt-user', {
        method: 'POST',
        body: newUser,
      })
      return user
    }
    catch (error) {
      console.error('Failed to create user', error)
      throw new Error('Failed to create user')
    }
  }

  // 更新用户
  const updateUser = async (updateUser: GPTUser): Promise<GPTUser> => {
    try {
      const user: GPTUser = await $fetch('/api/gpt-user', {
        method: 'PUT',
        body: updateUser,
      })
      return user
    }
    catch (error) {
      console.error('Failed to update user', error)
      throw new Error('Failed to update user')
    }
  }

  // 删除用户
  const deleteUser = async (id: string): Promise<GPTUser> => {
    try {
      const user: GPTUser = await $fetch('/api/gpt-user', {
        method: 'DELETE',
        body: { id },
      })
      return user
    }
    catch (error) {
      console.error(`Failed to delete user with id ${id}`, error)
      throw new Error(`Failed to delete user with id ${id}`)
    }
  }

  return { getAllUsers, getUserById, createUser, updateUser, deleteUser }
}

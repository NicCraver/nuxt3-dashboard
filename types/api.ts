export interface GPTUser {
  id?: string
  name?: string
  account: string
  password?: string
  type?: any
  state?: any
  createdAt?: Date
  updatedAt?: Date
}

export interface APIResponse<T> {
  data: T
  error?: string
}

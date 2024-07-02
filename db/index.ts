import { PrismaClient } from '@prisma/client'

function createPrismaClient() {
  return new PrismaClient({
    log:
    import.meta.env.MODE === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  })
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (import.meta.env.MODE !== 'production')
  globalForPrisma.prisma = db

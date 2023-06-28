import { createMockContext, MockContext, Context } from '@/infra/db/prisma/helpers/context'
import faker from '@faker-js/faker'
import { LogPrismaRepository } from '@/infra/db/prisma'

type SutTypes = {
  sut: LogPrismaRepository
}

const mockSut = (ctx: Context): SutTypes => {
  const sut = new LogPrismaRepository(ctx)
  return {
    sut
  }
}

describe('Log Prisma Repository', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })

  test('Should create an error log on success', async () => {
    const { sut } = mockSut(ctx)
    await sut.logError(faker.datatype.string())
    expect(mockCtx.prisma.errors.create).toBeCalledTimes(1)
    expect(mockCtx.prisma.errors.create).not.toThrow()
  })
})

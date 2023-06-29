import { mockPosts } from "@/../tests/domain/mocks"
import { HistoryRepository } from "@/infra/db/prisma"
import { Context, createMockContext, MockContext } from "@/infra/db/prisma/helpers/context"
import MockDate from 'mockdate'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('HistoryRepository', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  
  test('Should return an posts on success', async () => {
    const post = mockPosts()
    mockCtx.prisma.post.findMany.mockResolvedValue(post)
    const sut = new HistoryRepository(ctx)

    const promise = await sut.loadHistory()
    expect(promise).toEqual(post)
  })

  test('Should throw if prisma throws', async () => {
    mockCtx.prisma.post.findMany.mockRejectedValue(new Error())
    const sut = new HistoryRepository(ctx)

    const promise = sut.loadHistory()
    await expect(promise).rejects.toThrow()
  })
})

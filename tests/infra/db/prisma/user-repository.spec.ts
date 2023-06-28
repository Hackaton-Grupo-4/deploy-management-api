import { mockUserModel } from '@/../tests/domain/mocks'
import { DbAddUserRepository } from '@/infra/db/prisma'
import { Context, createMockContext, MockContext } from '@/infra/db/prisma/helpers/context'
import faker from '@faker-js/faker'
import MockDate from 'mockdate'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('DbAddUserRepository', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('Should return an user on success', async () => {
    const user = Object.assign({}, mockUserModel(), {
      created_at: new Date(),
      updated_at: new Date(),
      patient_id: faker.datatype.number()
    })
    mockCtx.prisma.user.create.mockResolvedValue(user)
    const sut = new DbAddUserRepository(ctx)

    const promise = await sut.add(user)
    expect(promise).toEqual(user)
  })

  test('Should throw if prisma throws', async () => {
    const user = Object.assign({}, mockUserModel(), {
      created_at: new Date(),
      updated_at: new Date(),
      patient_id: faker.datatype.number()
    })
    mockCtx.prisma.user.create.mockRejectedValue(new Error())
    const sut = new DbAddUserRepository(ctx)

    const promise = sut.add(user)
    await expect(promise).rejects.toThrow()
  })
})

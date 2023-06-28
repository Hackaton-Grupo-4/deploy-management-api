import { MissingParamError } from '@/presentation/erros'
import { RequiredFielValidation } from '@/validation/validators'
import faker from '@faker-js/faker'

const mockSut = (field: string): RequiredFielValidation => new RequiredFielValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', async () => {
    const sut = mockSut('name')
    const httpRequest = {
      body: {}
    }
    const error = await sut.validate(httpRequest.body)
    expect(error).toEqual(new MissingParamError('name'))
  })

  test('Should return null if a field was provided', async () => {
    const sut = mockSut('name')
    const httpRequest = {
      body: {
        name: faker.name.findName()
      }
    }
    const error = await sut.validate(httpRequest.body)
    expect(error).toBeNull()
  })
})

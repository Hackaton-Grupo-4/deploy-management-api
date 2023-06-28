import { MissingParamError } from '@/presentation/erros'
import { ValidationSpy } from '../../presentation/mocks'
import faker from '@faker-js/faker'
import { ValidationComposite } from '@/validation/validators'

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const mockSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationSpies } = mockSut()
    validationSpies[1].error = new Error()
    const error = sut.validate(faker.datatype.json())
    expect(error).toEqual(new Error())
  })

  test('Should return the first error if more than one validation fails', async () => {
    const { sut, validationSpies } = mockSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(faker.datatype.string())
    const error = await sut.validate(faker.datatype.json())
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', async () => {
    const { sut } = mockSut()
    const error = await sut.validate(faker.datatype.json())
    expect(error).toBeFalsy()
  })
})

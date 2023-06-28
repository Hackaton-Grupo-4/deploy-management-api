import { makeUserValidation } from '@/main/factories/controllers'
import { Validation } from '@/presentation/protocols'
import { RequiredFielValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('UserValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUserValidation()
    const requiredFields = ['name']
    const validations: Validation[] = requiredFields.map(field => new RequiredFielValidation(field))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

import { Validation } from '@/presentation/protocols'
import { RequiredFielValidation, ValidationComposite } from '@/validation/validators'

export const makeUserValidation = (): ValidationComposite => {
  const requiredFields = ['name']
  const validations: Validation[] = requiredFields.map(field => new RequiredFielValidation(field))
  return new ValidationComposite(validations)
}

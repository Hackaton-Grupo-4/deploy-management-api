import { Validation } from '@/presentation/protocols'
import { RequiredFielValidation, ValidationComposite } from '@/validation/validators'

export const makeDeletePostValidation = (): ValidationComposite => {
  const requiredFields = ['id']
  const validations: Validation[] = requiredFields.map(field => new RequiredFielValidation(field))
  return new ValidationComposite(validations)
}

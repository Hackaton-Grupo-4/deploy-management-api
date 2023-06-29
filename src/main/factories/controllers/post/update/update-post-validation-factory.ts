import { Validation } from '@/presentation/protocols'
import { RequiredFielValidation, ValidationComposite } from '@/validation/validators'

export const makeUpdatePostValidation = (): ValidationComposite => {
  const requiredFields = ['title', 'version', 'syntax', 'description', 'postDate', 'applicationId', 'platformId', 'postClassificationId']
  const validations: Validation[] = requiredFields.map(field => new RequiredFielValidation(field))
  return new ValidationComposite(validations)
}

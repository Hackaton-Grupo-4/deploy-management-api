import { MissingParamError } from '@/presentation/erros'
import { Validation } from '@/presentation/protocols'

export class RequiredFielValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
    return null
  }
}

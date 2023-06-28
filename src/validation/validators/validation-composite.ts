import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validations: Validation[]
  ) {}

  validate (input: unknown): Error | null {
    const errors: Error[] = []
    this.validations.forEach(validation => {
      const error = validation.validate(input)

      if (error) errors.push(error)
    })
    return errors[0] ?? null
  }
}

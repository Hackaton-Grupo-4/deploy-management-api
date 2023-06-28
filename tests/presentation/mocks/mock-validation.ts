import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  input: unknown
  error: Error | null = null
  validate (input: unknown): Error | null {
    this.input = input
    return this.error
  }
}

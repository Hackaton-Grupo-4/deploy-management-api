import { LoadHistoryRepository } from '@/data/protocols/db'
import { mockPosts } from '../../domain/mocks'

export class LoadHistoryRepositorySpy implements LoadHistoryRepository {
  result: LoadHistoryRepository.Result = mockPosts()

  async loadHistory (): Promise<LoadHistoryRepository.Result> {
    return this.result
  }
}

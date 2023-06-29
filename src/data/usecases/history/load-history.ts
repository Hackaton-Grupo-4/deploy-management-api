import { LoadHistoryRepository } from "@/data/protocols/db";
import { LoadHistory } from "@/domain/usecases";

export class DbLoadHistory implements LoadHistory {
  constructor(
    private readonly loadHistoryRepository: LoadHistoryRepository
  ) {}
    async load (): Promise<any> {
        return await this.loadHistoryRepository.loadHistory()
    }
}

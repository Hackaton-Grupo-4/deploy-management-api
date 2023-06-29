import { LoadHistoryRepository } from "@/data/protocols/db";
import { LoadHistory } from "@/domain/usecases";

export class DbLoadHistory implements LoadHistory {
  constructor(
    private readonly loadHistoryRepository: LoadHistoryRepository
  ) {}
    async load (filters: LoadHistory.Params): Promise<LoadHistory.Result> {
        return await this.loadHistoryRepository.loadHistory(filters)
    }
}

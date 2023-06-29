import { LoadHistory } from "@/domain/usecases"

export interface LoadHistoryRepository {
    loadHistory(filters: LoadHistoryRepository.Params): Promise<LoadHistoryRepository.Result>
}

export namespace LoadHistoryRepository {
    export type Params = LoadHistory.Params
    export type Result = any // TODO: implement Post type
}

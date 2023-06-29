export interface LoadHistoryRepository {
    loadHistory(): Promise<LoadHistoryRepository.Result>
}

export namespace LoadHistoryRepository {
    export type Result = any // TODO: implement Post type
}
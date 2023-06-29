export interface LoadHistory {
    load: () => Promise<LoadHistory.Result>
}

export namespace LoadHistory {
    export type Result = any //Todo: implement Post type
}
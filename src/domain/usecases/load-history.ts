import { PostModel } from "../models"

export interface LoadHistory {
    load: (filters: LoadHistory.Params) => Promise<LoadHistory.Result>
}

export namespace LoadHistory {
    export type Params = {
        skip: number
        take: number
        application?: string
        platform?: string
    }
    export type Result = {
        results: PostModel[]
        totalCount: number
        totalPages: number
    }
}
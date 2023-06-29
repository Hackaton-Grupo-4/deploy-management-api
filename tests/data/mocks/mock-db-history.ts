import { LoadHistory } from "@/domain/usecases";

export class LoadHistorySpy implements LoadHistory {
    result: any
    async load (): Promise<any> {
        return this.result
    }
}
import { LoadHistory } from "@/domain/usecases";
import { mockPosts } from "../../domain/mocks";

export class LoadHistorySpy implements LoadHistory {
    result: any = mockPosts()
    async load (): Promise<any> {
        return this.result
    }
}
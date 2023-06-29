import { DbLoadHistory } from "@/data/usecases";
import { LoadHistoryRepositorySpy } from "../../infra/mocks";

type SutTypes = {
    sut: DbLoadHistory
    loadHistoryRepositorySpy: LoadHistoryRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadHistoryRepositorySpy = new LoadHistoryRepositorySpy()
    const sut = new DbLoadHistory(loadHistoryRepositorySpy)
    return {
        sut,
        loadHistoryRepositorySpy
    }
}


describe("DbLoadHistory usecase", () => {
    test('Should throw if LoadHistoryRepository throws', async () => {
        const { sut, loadHistoryRepositorySpy } = makeSut()
        jest.spyOn(loadHistoryRepositorySpy, 'loadHistory').mockRejectedValue(new Error())
        const promise = sut.load()
        await expect(promise).rejects.toThrow()
    })

    it("should return the loaded history", async () => {
        const { sut, loadHistoryRepositorySpy } = makeSut()
        const history = await sut.load()

        expect(history).toEqual(loadHistoryRepositorySpy.result)
    })
});

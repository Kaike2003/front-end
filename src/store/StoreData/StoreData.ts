import { create } from "zustand"

interface IStoreData {
    data: Array<any>
}


type Action = {
    setData: (data: IStoreData["data"]) => void
}


export const useStoreData = create<IStoreData & Action>((set, get) => (
    {
        data: [],
        setData: (data) => set(() => ({ data: data }))
    }
))



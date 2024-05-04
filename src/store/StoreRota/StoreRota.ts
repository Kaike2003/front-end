import { create } from "zustand"

interface IStoreRota {
    rota: string
}


type Action = {
    setRota: (rota: IStoreRota["rota"]) => void
}


export const useStoreRota = create<IStoreRota & Action>((set, get) => (
    {
        rota: "",
        setRota: (rota) => set(() => ({ rota: rota }))
    }
))



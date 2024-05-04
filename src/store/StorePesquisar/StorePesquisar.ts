import { create } from "zustand"

interface IStorePesquisar {
    pesquisar: string
}


type Action = {
    setPesquisar: (rota: IStorePesquisar["pesquisar"]) => void
}


export const useStorePesquisar = create<IStorePesquisar & Action>((set, get) => (
    {
        pesquisar: "",
        setPesquisar: (pesquisar) => set(() => ({ pesquisar: pesquisar }))
    }
))



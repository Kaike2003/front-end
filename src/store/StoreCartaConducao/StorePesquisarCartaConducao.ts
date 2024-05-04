import { create } from "zustand";


interface IStoreCartaConducao {
    pesquisarCartaConducaoAchado: boolean
    pesquisarCartaConducaoPerdido: boolean
}

type TAction = {
    setPesquisarCartaConducaoAchado: (pesquisarCartaConducaoAchado: IStoreCartaConducao["pesquisarCartaConducaoAchado"]) => void
    setPesquisarCartaConducaoPerdido: (pesquisarCartaConducaoPerdido: IStoreCartaConducao["pesquisarCartaConducaoPerdido"]) => void
}


export const useStorePesquisarCartaConducao = create<IStoreCartaConducao & TAction>()((set, get) => (
    {
        pesquisarCartaConducaoAchado: false,
        setPesquisarCartaConducaoAchado: (pesquisarCartaConducaoAchado) => set(() => ({ pesquisarCartaConducaoAchado: pesquisarCartaConducaoAchado })),
        pesquisarCartaConducaoPerdido: false,
        setPesquisarCartaConducaoPerdido: (pesquisarCartaConducaoPerdido) => set(() => ({ pesquisarCartaConducaoPerdido: pesquisarCartaConducaoPerdido }))
    }
))
import { create } from "zustand";


interface IStoreLivrete {
    pesquisarLivreteAchado: boolean
    pesquisarLivretePerdido: boolean
}

type TAction = {
    setPesquisarLivreteAchado: (pesquisarLivreteAchado: IStoreLivrete["pesquisarLivreteAchado"]) => void
    setPesquisarLivretePerdido: (pesquisarBilheteIdentidade: IStoreLivrete["pesquisarLivretePerdido"]) => void
}


export const useStoreLivrete = create<IStoreLivrete & TAction>()((set, get) => (
    {
        pesquisarLivreteAchado: false,
        setPesquisarLivreteAchado: (pesquisarLivreteAchado) => set(() => ({ pesquisarLivreteAchado: pesquisarLivreteAchado })),
        pesquisarLivretePerdido: false,
        setPesquisarLivretePerdido: (pesquisarLivretePerdido) => set(() => ({ pesquisarLivretePerdido: pesquisarLivretePerdido }))
    }
))
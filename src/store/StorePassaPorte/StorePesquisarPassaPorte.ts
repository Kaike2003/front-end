import { create } from "zustand";


interface IStorePassaPorte {
    pesquisarPassaPorteAchado: boolean
    pesquisarPassaPortePerdido: boolean
}

type TAction = {
    setPesquisarPassaPorteAchado: (pesquisarPassaPorteAchado: IStorePassaPorte["pesquisarPassaPorteAchado"]) => void
    setPesquisarPassaPortePerdido: (pesquisarPassaPortePerdido: IStorePassaPorte["pesquisarPassaPortePerdido"]) => void
}


export const useStorePassaPorte = create<IStorePassaPorte & TAction>()((set, get) => (
    {
        pesquisarPassaPorteAchado: false,
        setPesquisarPassaPorteAchado: (pesquisarPassaPorteAchado) => set(() => ({ pesquisarPassaPorteAchado: pesquisarPassaPorteAchado })),
        pesquisarPassaPortePerdido: false,
        setPesquisarPassaPortePerdido: (pesquisarPassaPortePerdido) => set(() => ({ pesquisarPassaPortePerdido: pesquisarPassaPortePerdido }))
    }
))
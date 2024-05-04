import { create } from "zustand";


interface IStorePesquisarBilheteIdentidade {
    pesquisarBilheteIdentidadeAchado: boolean
    pesquisarBilheteIdentidadePerdido: boolean
}

type TAction = {
    setPesquisarBilheteIdentidadeAchado: (pesquisarBilheteIdentidade: IStorePesquisarBilheteIdentidade["pesquisarBilheteIdentidadeAchado"]) => void
    setPesquisarBilheteIdentidadePerdido: (pesquisarBilheteIdentidade: IStorePesquisarBilheteIdentidade["pesquisarBilheteIdentidadePerdido"]) => void
}


export const useStorePesquisarBilheteIdentidade = create<IStorePesquisarBilheteIdentidade & TAction>()((set, get) => (
    {
        pesquisarBilheteIdentidadeAchado: false,
        setPesquisarBilheteIdentidadeAchado: (pesquisarBilheteIdentidadeAchado) => set(() => ({ pesquisarBilheteIdentidadeAchado: pesquisarBilheteIdentidadeAchado })),
        pesquisarBilheteIdentidadePerdido: false,
        setPesquisarBilheteIdentidadePerdido: (pesquisarBilheteIdentidadePerdido) => set(() => ({ pesquisarBilheteIdentidadePerdido: pesquisarBilheteIdentidadePerdido }))
    }
))
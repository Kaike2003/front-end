import { create } from "zustand"

interface IStoreRotaStoreModalAchado {
    abrirAchado: boolean
    documento_id_achado: string
}


type Action = {
    abrirModalAchado: (isOpen: IStoreRotaStoreModalAchado["abrirAchado"]) => void
    fecharModalAchado: (isOpen: IStoreRotaStoreModalAchado["abrirAchado"]) => void
    setDocumentoIdAchado: (documento_id_achado: IStoreRotaStoreModalAchado["documento_id_achado"]) => void
}

export const useModalAchado = create<IStoreRotaStoreModalAchado & Action>((set, get) => (
    {
        abrirAchado: false,
        documento_id_achado: "",
        abrirModalAchado: (abrir) => set(() => ({ abrirAchado: true })),
        fecharModalAchado: (abrir) => set(() => ({ abrirAchado: false })),
        setDocumentoIdAchado: (documento_id_achado) => set(() => ({ documento_id_achado: documento_id_achado }))
    }
))



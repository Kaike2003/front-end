import { create } from "zustand"

interface IStoreRotaStoreModalAchado {
    abrirPerdido: boolean
    documento_id_perdido: string
}


type Action = {
    abrirModalPerdido: (isOpen: IStoreRotaStoreModalAchado["abrirPerdido"]) => void
    fecharModalPerdido: (isOpen: IStoreRotaStoreModalAchado["abrirPerdido"]) => void
    setDocumentoIdPerdido: (documento_id_perdido: IStoreRotaStoreModalAchado["documento_id_perdido"]) => void
}

export const useStoreModalPerdido = create<IStoreRotaStoreModalAchado & Action>((set, get) => (
    {
        abrirPerdido: false,
        documento_id_perdido: "",
        abrirModalPerdido: (abrir) => set(() => ({ abrirPerdido: true })),
        fecharModalPerdido: (abrir) => set(() => ({ abrirPerdido: false })),
        setDocumentoIdPerdido: (documento_id_perdido) => set(() => ({ documento_id_perdido: documento_id_perdido }))
    }
))



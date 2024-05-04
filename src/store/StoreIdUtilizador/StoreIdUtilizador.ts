import { create } from "zustand"

interface IStoreIdUtilizador {
    idUtilizador: string
}


type Action = {
    setIdUtilizador: (idUtilizador: IStoreIdUtilizador["idUtilizador"]) => void
}


export const StoreIdUtilizador = create<IStoreIdUtilizador & Action>((set, get) => (
    {
        idUtilizador: "",
        setIdUtilizador: (idUtilizador) => set(() => ({ idUtilizador: idUtilizador }))
    }
))



import { create } from "zustand"

interface IStoreIdDocumento {
    idDocumento: string
}


type Action = {
    setIdDocumento: (idDocumento: IStoreIdDocumento["idDocumento"]) => void
}


export const StoreIdDocumento = create<IStoreIdDocumento & Action>((set, get) => (
    {
        idDocumento: "",
        setIdDocumento: (idDocumento) => set(() => ({ idDocumento: idDocumento }))
    }
))



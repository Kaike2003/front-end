import { create } from "zustand"

interface IStoreCategoria {
    categoria: boolean
}


type Action = {
    setCategoria: (categoria: IStoreCategoria["categoria"]) => void
}


export const useStoreCategoria = create<IStoreCategoria & Action>((set, get) => (
    {
        categoria: false,
        setCategoria: (categoria) => set(() => ({ categoria: categoria }))
    }
))



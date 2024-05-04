import { create } from "zustand"

interface IStoreEmail {
    email: string
}


type Action = {
    setEmail: (rota: IStoreEmail["email"]) => void
}


export const useStoreEmail = create<IStoreEmail & Action>((set, get) => (
    {
        email: "",
        setEmail: (email) => set(() => ({ email: email }))
    }
))



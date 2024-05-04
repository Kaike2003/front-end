import { create } from "zustand"

interface IStoreToken {
    token: string
}


type Action = {
    setToken: (rota: IStoreToken["token"]) => void
}


export const useStoreToken = create<IStoreToken & Action>((set, get) => (
    {
        token: "",
        setToken: (token) => set(() => ({ token: token }))
    }
))



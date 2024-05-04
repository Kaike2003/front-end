import React from "react"
import { createContext, useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import { api } from "../services/api/getToken"
import axios from "axios"
import { useStoreRota } from "../store/StoreRota/StoreRota"
import { useStoreToken } from "../store/StoreToken/StoreRota"
import { useStoreEmail } from "../store/StoreEmail/StoreEmail"


type TContext = {
    logadoAdmin: boolean
    logadoEstudante: boolean
    logadoFuncionario: boolean
    utilizadorAdmin: string
    utilizadorEstudante: string
    utilizadorFuncionario: string
    logarUtilizadorAdmin: (email: string, palavra_passe: string) => void
    sairUtilizadorAdmin: () => void
    logarUtilizadorEstudante: (email: string, palavra_passe: string) => void
    sairUtilizadorEstudante: () => void
    logarUtilizadorFuncionario: (email: string, palavra_passe: string) => void
    sairUtilizadorFuncionario: () => void
}

export const AuthContext = createContext<TContext>({
    logadoAdmin: false,
    logadoEstudante: false,
    logadoFuncionario: false,
    utilizadorAdmin: "",
    utilizadorEstudante: "",
    utilizadorFuncionario: "",
    logarUtilizadorAdmin: () => { },
    sairUtilizadorAdmin: () => { },
    logarUtilizadorEstudante: () => { },
    sairUtilizadorEstudante: () => { },
    logarUtilizadorFuncionario: () => { },
    sairUtilizadorFuncionario: () => { }
})


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [utilizadorAdmin, setUtilizadorAdmin] = useState<string>("")
    const [utilizadorEstudante, setUtilizadorEstudante] = useState<string>("")
    const [utilizadorFuncionario, setUtilizadorFuncionario] = useState<string>("")

    const [setRota] = useStoreRota((state) => [state.setRota])
    const [setToken] = useStoreToken((state) => [state.setToken])
    const [setEmail] = useStoreEmail((state) => [state.setEmail])

    const CallBack = useCallback(() => {
        const loadingStoreData = () => {
            const storageToken = localStorage.getItem("@Auth:token")
            const storageEmail = localStorage.getItem("@Auth:email")
            const storageTipoUtilizador = localStorage.getItem("@Auth:tipo_utilizador")

            setRota(`${storageTipoUtilizador}`)
            setToken(`${storageToken}`)
            setEmail(`${storageEmail}`)

            if (storageToken && storageEmail) {
                setUtilizadorAdmin(storageToken)
                setUtilizadorEstudante(storageToken)
                setUtilizadorFuncionario(storageToken)
                setToken(`${storageToken}`)
                setEmail(`${storageEmail}`)
            }
        }
        loadingStoreData()
    }, [])


    useEffect(() => {
        CallBack()
    }, [CallBack, setRota, setToken, setEmail])

    const logarUtilizadorAdmin = async (email: string, palavraPasse: string) => {
        try {

            const response = await api.post("/admin/login_admin", {
                palavra_passe: palavraPasse,
                email: email,
            })


            if (response.data.error) {
                alert(response.data.error);
            } else {
                setUtilizadorAdmin(response.data.token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;
                localStorage.setItem("@Auth:token", response.data.token);
                localStorage.setItem("@Auth:email", email);
                localStorage.setItem("@Auth:__id", response.data.utilizador_id);
                localStorage.setItem("@Auth:tipo_utilizador", "admin");
                setRota("admin")

                toast.success("Sessão iniciada")
            }


        } catch (error: any) {
            console.log(error);
            toast.error(`${error.response.data}`)
        }

    }


    const sairUtilizadorAdmin = () => {
        localStorage.clear();
        setUtilizadorAdmin("");
    };

    const logarUtilizadorEstudante = async (email: string, palavraPasse: string) => {

        try {

            const response = await api.post("/estudante/login_estudante", {
                palavra_passe: palavraPasse,
                email: email,
            })


            if (response.data.error) {
                alert(response.data.error);
            } else {
                setUtilizadorEstudante(response.data.token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;
                localStorage.setItem("@Auth:token", response.data.token);
                localStorage.setItem("@Auth:email", email);
                localStorage.setItem("@Auth:__id", response.data.utilizador_id);
                localStorage.setItem("@Auth:tipo_utilizador", "estudante");
                setRota("estudante")


                toast.success("Sessão iniciada")
            }

        } catch (error: any) {
            console.log(error);
            toast.error(`${error.response.data}`)
        }

    }

    const sairUtilizadorEstudante = () => {
        localStorage.clear();
        setUtilizadorEstudante("");
    };

    const logarUtilizadorFuncionario = async (email: string, palavraPasse: string) => {


        try {

            const response = await api.post("/funcionario/login_funcionario", {
                palavra_passe: palavraPasse,
                email: email,
            })


            if (response.data.error) {
                alert(response.data.error);
            } else {
                // console.log(response)
                setUtilizadorFuncionario(response.data.token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;
                localStorage.setItem("@Auth:token", response.data.token);
                localStorage.setItem("@Auth:email", email);
                localStorage.setItem("@Auth:__id", response.data.utilizador_id);
                localStorage.setItem("@Auth:tipo_utilizador", "funcionario");
                setRota("funcionario")

                toast.success("Sessão iniciada")
            }

        } catch (error: any) {
            console.log(error);
            toast.error(`${error.response.data}`)
        }

    }

    const sairUtilizadorFuncionario = () => {
        localStorage.clear();
        setUtilizadorFuncionario("");
    };

    return (
        <AuthContext.Provider
            value={{
                logadoAdmin: !!utilizadorAdmin,
                logadoEstudante: !!utilizadorEstudante,
                logadoFuncionario: !!utilizadorFuncionario,
                utilizadorAdmin,
                utilizadorEstudante,
                utilizadorFuncionario,
                logarUtilizadorAdmin,
                sairUtilizadorAdmin,
                logarUtilizadorEstudante,
                sairUtilizadorEstudante,
                logarUtilizadorFuncionario,
                sairUtilizadorFuncionario
            }}>

            {children}

        </AuthContext.Provider>

    )


}
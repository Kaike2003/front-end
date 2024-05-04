import React, { useCallback, useEffect, useRef, useState } from 'react'
import InputEditar from './InputEditar'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string, number, date } from 'yup';
import { api } from '../../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { useStoreRota } from '../../../../store/StoreRota/StoreRota';
import { useStoreEmail } from '../../../../store/StoreEmail/StoreEmail';
import dateFormat from 'dateformat';


import { useStoreAtualizar } from '../../../../store/StoreAtualizar/StoreAtualizar';



export default function PalavraPassePerfil() {

    const navigate = useNavigate()
    const [dataUtilizador, setDataUtilizador] = useState<any[]>([])
    const [rota] = useStoreRota((state) => [state.rota])
    const [emailUtilizador, setEmailUtilizador] = useState("")
    const [atualizar, setAtualizar] = useStoreAtualizar((state) => [state.atualizar, state.setAtualizar])

    const [token, setToken] = useState("")
    const [idUtilizador, setIdUtilizador] = useState("")


    useEffect(() => {
        const storageToken = localStorage.getItem("@Auth:token")
        const storage__Id = localStorage.getItem("@Auth:__id")
        const storageEmailUtilizador = localStorage.getItem("@Auth:email")

        setToken(`${storageToken}`)
        setIdUtilizador(`${storage__Id}`)
        setEmailUtilizador(`${storageEmailUtilizador}`)
    }, [])

    const callBack = useCallback(async () => {

        const response = await api.get(`/publico/listar_todos_utilizadores`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const newData = response.data
        setDataUtilizador(newData)

    }, [token])

    useEffect(() => {
        callBack()
    }, [callBack])



    const SchemaCriarContaEstudante = object({
        palavra_passe_antiga: string().required("Palavra passe antiga é um campo obrigatório").min(3, "A palavra passe antiga deve ter pelo menos 4 caracteres").max(40, "A palavra passe antiga deve ter no máximo 40 caracteres"),
        palavra_passe_nova: string().required("Palavra passe nova é um campo obrigatório").min(3, "A palavra passe nova").max(40, "A palavra passe nova no máximo 40 caracteres"),
    })



    const valores = {
        palavra_passe_antiga: "",
        palavra_passe_nova: ""
    }



    return (
        <div className='' >
            <div className='bg-indigo-100 flex items-center justify-center h-full'>

                <section className="w-[100%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">EDITAR PALAVRA PASSE</h1>
                    <Formik
                        initialValues={valores}
                        validationSchema={SchemaCriarContaEstudante}
                        validateOnChange
                        enableReinitialize
                        onSubmit={async values => {

                            const result_api = await api.put(`/${rota}/atualizar_palavra_passe_${rota}/${idUtilizador}`,
                                {
                                    palavra_passe_antiga: values.palavra_passe_antiga,
                                    palavra_passe_nova: values.palavra_passe_nova
                                }
                                ,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            )

                            if (result_api.data) {

                                toast.success("Palavra passe editada")


                                if (atualizar === false) {
                                    setAtualizar(true)
                                } else {
                                    setAtualizar(false)
                                }

                                setTimeout(() => {

                                    return navigate(`/suchen/${rota}`)
                                }, 2500)

                            } else {
                                console.log(result_api)
                            }

                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (

                            <Form className="">

                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                                    <InputEditar
                                        id='palavra_passe_antiga'
                                        titulo_label='Palavra passe antiga'
                                        type='password'
                                        value={values.palavra_passe_antiga}
                                        key={"palavra_passe_antiga"}
                                        onchange={handleChange("palavra_passe_antiga")}
                                        onblur={handleBlur("palavra_passe_antiga")}
                                        placeholder="Digite a palavra passe antiga"
                                        touched={touched.palavra_passe_antiga}
                                        errors={errors.palavra_passe_antiga}
                                    />

                                    <InputEditar
                                        id='palavra_passe_nova'
                                        titulo_label='Palavra passe nova'
                                        type='password'
                                        value={values.palavra_passe_nova}
                                        key={"palavra_passe_nova"}
                                        onchange={handleChange("palavra_passe_nova")}
                                        onblur={handleBlur("palavra_passe_nova")}
                                        placeholder="Digite a palavra passe nova"
                                        touched={touched.palavra_passe_nova}
                                        errors={errors.palavra_passe_nova}
                                    />




                                </div>


                                <Button
                                    nome='Editar palavra passe'
                                />


                            </Form>


                        )}
                    </Formik >

                    <form>

                    </form>
                </section>



            </div >
        </div>

    )
}


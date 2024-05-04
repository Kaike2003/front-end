import React, { useEffect, useState } from 'react'
import InputEditar from './InputEditar'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, number } from 'yup';
import { api } from '../../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { useStoreRota } from '../../../../store/StoreRota/StoreRota';


import { useStoreAtualizar } from '../../../../store/StoreAtualizar/StoreAtualizar';



export default function TelefonePerfil() {

    const navigate = useNavigate()
    const [rota] = useStoreRota((state) => [state.rota])
    const [atualizar, setAtualizar] = useStoreAtualizar((state) => [state.atualizar, state.setAtualizar])

    const [token, setToken] = useState("")


    useEffect(() => {
        const storageToken = localStorage.getItem("@Auth:token")

        setToken(`${storageToken}`)
    }, [])




    const SchemaCriarContaEstudante = object({
        telefone: number().min(111111111, "Telefone deve ser maior ou igual a 111111111").max(999999999, "O telefone deve ser menor ou igual a 999999999").required("Telefone é um campo obrigatório"),
    })

    const valores = {
        telefone: 0
    }

    return (
        <div className='' >
            <div className='bg-indigo-100 flex items-center justify-center h-full'>

                <section className="w-[100%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">EDITAR NÚMERO DE TELEFONE</h1>
                    <Formik
                        initialValues={valores}
                        validationSchema={SchemaCriarContaEstudante}
                        validateOnChange
                        enableReinitialize
                        onSubmit={async values => {

                            await api.put(`/${rota}/atualizar_perfil_telefone`,
                                {
                                    telefone: Number(values.telefone),
                                }
                                ,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            ).then(() => {

                                toast.success("Telefone editado")

                                if (atualizar === false) {
                                    setAtualizar(true)
                                } else {
                                    setAtualizar(false)
                                }

                                setTimeout(() => {

                                    return navigate(`/suchen/${rota}`)
                                }, 2500)

                            }).catch((error) => {
                                toast.error(`${error.response.data}`)
                            })







                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (

                            <Form className="">

                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                                    <InputEditar
                                        id='telefone'
                                        titulo_label='Novo número de telefone'
                                        type='number'
                                        value={values.telefone}
                                        key={"telefone"}
                                        onchange={handleChange("telefone")}
                                        onblur={handleBlur("telefone")}
                                        placeholder="Digite o novo número de telefone"
                                        touched={touched.telefone}
                                        errors={errors.telefone}
                                    />


                                </div>


                                <Button
                                    nome='Editar telefone'
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


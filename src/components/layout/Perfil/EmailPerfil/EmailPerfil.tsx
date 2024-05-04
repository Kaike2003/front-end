import React, { useEffect, useState } from 'react'
import InputEditar from './InputEditar'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { api } from '../../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { useStoreRota } from '../../../../store/StoreRota/StoreRota';


import { useStoreAtualizar } from '../../../../store/StoreAtualizar/StoreAtualizar';



export default function EmailPerfil() {

    const navigate = useNavigate()
    const [rota] = useStoreRota((state) => [state.rota])
    const [atualizar, setAtualizar] = useStoreAtualizar((state) => [state.atualizar, state.setAtualizar])

    const [token, setToken] = useState("")


    useEffect(() => {
        const storageToken = localStorage.getItem("@Auth:token")

        setToken(`${storageToken}`)
    }, [])




    const SchemaEditarEmail = object({
        email: string().required("Email é um campo obrigatório").email(`Email deve ser um email válido`),
    })

    const valores = {
        email: ""
    }

    return (
        <div className='' >
            <div className='bg-indigo-100 flex items-center justify-center h-full'>

                <section className="w-[100%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">EDITAR EMAIL</h1>
                    <Formik
                        initialValues={valores}
                        validationSchema={SchemaEditarEmail}
                        validateOnChange
                        enableReinitialize
                        onSubmit={async values => {

                            await api.put(`/${rota}/atualizar_perfil_email`,
                                {
                                    email: values.email,
                                }
                                ,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            ).then((sucesso) => {

                                toast.success(sucesso.data)

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
                                        id='email'
                                        titulo_label='Novo email'
                                        type='text'
                                        value={values.email}
                                        key={"email"}
                                        onchange={handleChange("email")}
                                        onblur={handleBlur("email")}
                                        placeholder="Digite o novo email"
                                        touched={touched.email}
                                        errors={errors.email}
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


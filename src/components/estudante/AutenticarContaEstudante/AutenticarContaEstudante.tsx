import React from 'react'
import Input from './Input'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { api } from '../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

export default function AutenticarContaEstudante() {

    const navigate = useNavigate()

    const SchemaCriarContaEstudante = object({
        codigo: string().required("Código de autenticação é um campo obrigatório").min(11, "O código de autenticação deve ter pelo menos 3 caracteres").max(40, "O código de autenticação deve ter no máximo 40 caracteres"),
    })

    return (


        <div className='h-screen bg-indigo-100 flex justify-center items-center'>

            <div className="lg:w-2/5 md:w-1/2 w-2/3">


                <Formik
                    initialValues={{
                        codigo: "",
                    }}
                    validationSchema={SchemaCriarContaEstudante}
                    validateOnChange
                    onSubmit={async values => {

                        const result_api = await api.put("/estudante/autenticar_estudante", {
                            codigo_autenticacao: values.codigo,
                        })

                        if (result_api.data) {

                            toast.success('A sua conta foi autenticada com sucesso')

                            setTimeout(() => {

                                navigate("/suchen/estudante/login")

                            }, 2000)


                        } else {
                            console.log(result_api)
                        }

                    }}
                >
                    {({ errors, touched, handleChange, handleBlur }) => (

                        <Form className="">



                            <div className="bg-white p-10 rounded-lg shadow-lg min-w-full">

                                <h1 className="text-xl font-bold text-black capitalize dark:text-white">AUTENTICAR CONTA</h1>

                                <Input
                                    id='codigo'
                                    titulo_label='Código de autenticação'
                                    type='text'
                                    key={"codigo"}
                                    onchange={handleChange("codigo")}
                                    onblur={handleBlur("codigo")}
                                    placeholder="Digite seu o código de autenticação"
                                    touched={touched.codigo}
                                    errors={errors.codigo}
                                />

                                <Button />

                            </div>



                        </Form>


                    )}
                </Formik >

                <form>

                </form>
            </div>



        </div>



    )
}


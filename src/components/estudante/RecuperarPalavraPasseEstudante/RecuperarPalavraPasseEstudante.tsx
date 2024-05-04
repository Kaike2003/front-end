import React from 'react'
import Input from './Input'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { api } from '../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

export default function RecuperarPalavraPasseEstudante() {
    const navigate = useNavigate()

    const SchemaCriarContaEstudante = object({
        email: string().email().required("Email é um campo obrigatório"),
    })

    return (


        <div className='h-screen bg-indigo-100 flex justify-center items-center'>

            <div className="lg:w-2/5 md:w-1/2 w-2/3">


                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={SchemaCriarContaEstudante}
                    validateOnChange
                    onSubmit={async values => {

                        const result_api = await api.put("/estudante/recuperar_palavra_passe_estudante", {
                            email: values.email,
                        })


                        if (result_api.status === 200) {

                            toast.success('Enviamos uma nova palavra passe para o seu email')

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

                                <h1 className="text-xl font-bold text-black capitalize dark:text-white">RECUPERAR PALAVRA PASSE</h1>

                                <Input
                                    id='email'
                                    titulo_label='Email'
                                    type='text'
                                    key={"email"}
                                    onchange={handleChange("email")}
                                    onblur={handleBlur("email")}
                                    placeholder="Digite seu o seu email"
                                    touched={touched.email}
                                    errors={errors.email}
                                />

                                <Button />

                            </div>



                        </Form>


                    )}
                </Formik >


            </div>



        </div>



    )
}


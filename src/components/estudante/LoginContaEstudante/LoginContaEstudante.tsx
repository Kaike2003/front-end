import React, { useContext } from 'react'
import Input from './Input'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../../context/AutenticacaoContext';

export default function LoginContaEstudante() {

    const { logarUtilizadorEstudante, logadoEstudante } = useContext(AuthContext)

    const navigate = useNavigate()

    const SchemaCriarContaEstudante = object({
        email: string().email().required("Email é um campo obrigatório"),
        palavra_passe: string().required("Palavra passe é um campo obrigatório").min(4, "A palavra passe deve ter pelo menos 4 caracteres").max(40, "A palavra passe deve ter no máximo 40 caracteres"),

    })


    if (logadoEstudante) {
        return <>
            {navigate("/suchen/estudante")}
        </>
    } else {


        return (


            <div className='h-screen bg-indigo-100 flex justify-center items-center'>

                <div className="lg:w-2/5 md:w-1/2 w-2/3">


                    <Formik
                        initialValues={{
                            email: "",
                            palavra_passe: ""
                        }}
                        validationSchema={SchemaCriarContaEstudante}
                        validateOnChange
                        onSubmit={async values => {
                            const email = values.email
                            const palavra_passe = values.palavra_passe
                            return logarUtilizadorEstudante(email, palavra_passe)
                        }}
                    >
                        {({ errors, touched, handleChange, handleBlur }) => (

                            <Form className="">



                                <div className="bg-white p-10 rounded-lg shadow-lg min-w-full">

                                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">INICIAR SESSÃO</h1>

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

                                    <Input
                                        id='palavra_passe'
                                        titulo_label='Palavra passe'
                                        type='password'
                                        key={"palavra_passe"}
                                        onchange={handleChange("palavra_passe")}
                                        onblur={handleBlur("palavra_passe")}
                                        placeholder="Digite sua palavra passe"
                                        touched={touched.palavra_passe}
                                        errors={errors.palavra_passe}
                                    />

                                    <Button />

                                </div>



                            </Form>


                        )}
                    </Formik >


                </div>



            </div >



        )

    }

}


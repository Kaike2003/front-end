import React, { useCallback, useEffect, useState } from 'react'
import InputEditar from './InputEditar'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string, date } from 'yup';
import { api } from '../../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { useStoreRota } from '../../../../store/StoreRota/StoreRota';
import dateFormat from 'dateformat';
import SelectClasse from './SelectClasse';
import SelectCurso from './SelectCurso';

import { useStoreAtualizar } from '../../../../store/StoreAtualizar/StoreAtualizar';
import SelectClasseADMIN from './SelectClasseADMIN';
import SelectCursoFUNCIONARIO from './SelectCursoFUNCIONARIO';
import SelectCursoADMIN from './SelectCursoADMIN';
import SelectClasseFUNCIONARIO from './SelectClasseFUNC';


export default function EditarPerfil() {

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
        nome: string().required("Nome é um campo obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres").max(40, "O nome deve ter no máximo 40 caracteres"),
        classe: string().required("Classe é um campo obrigatório").min(4, "A classe deve ter pelo menos 4 caracteres").max(400, "A classe deve ter no máximo 40 caracteres"),
        curso: string().required("Cursp é um campo obrigatório").min(4, "O curso deve ter pelo menos 4 caracteres").max(400, "O curso deve ter no máximo 40 caracteres"),
        data_nascimento: date().required("Data de nascimento é um campo obrigatório").max("2012-12-31", "Precisas ser maior de 18").min("1890-12-31")
    })


    return (
        <React.Fragment>

            {dataUtilizador.map(({
                id,
                nome,
                email,
                data_nascimento,
                classe,
                curso
            }: {
                id: string,
                nome: string,
                email: string,
                data_nascimento: string,
                classe: string,
                curso: string

            }) => {

                const valores = {
                    nome: "",
                    data_nascimento: new Date(),
                    curso: "",
                    classe: ""
                }

                const dadosSalvos = {
                    nome: nome,
                    classe: classe,
                    curso: curso,
                    data_nascimento: dateFormat(new Date(data_nascimento), "yyyy-mm-dd"),
                }

                if (id === idUtilizador) {
                    return (
                        <div className='' key={id + email}>
                            <div className='bg-indigo-100 flex items-center justify-center h-full'>

                                <section className="w-[100%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">EDITAR PERFIL</h1>
                                    <Formik
                                        initialValues={dadosSalvos || valores}
                                        validationSchema={SchemaCriarContaEstudante}
                                        // validateOnChange
                                        enableReinitialize
                                        onSubmit={async values => {




                                            if (email === emailUtilizador) {


                                                const result_api = await api.put(`/${rota}/atualizar_perfil_informacoes_${rota}/${id}`,
                                                    {
                                                        nome: values.nome,
                                                        data_nascimento: new Date(values.data_nascimento),
                                                        curso: values.curso,
                                                        classe: values.classe

                                                    }
                                                    ,
                                                    {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`
                                                        }
                                                    }
                                                )

                                                if (result_api.data) {

                                                    toast.success('Perfil editado')

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
                                            } else {
                                                return null
                                            }





                                        }}
                                    >
                                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (

                                            <Form className="" key={id + email}>

                                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                                                    <InputEditar
                                                        id='nome'
                                                        titulo_label='Nome'
                                                        type='text'
                                                        value={values.nome}
                                                        key={"nome"}
                                                        onchange={handleChange("nome")}
                                                        onblur={handleBlur("nome")}
                                                        placeholder="Digite o seu nome"
                                                        touched={touched.nome}
                                                        errors={errors.nome}
                                                    />

                                                    {/* <InputEditar
                                                        id='email'
                                                        titulo_label='Email'
                                                        type='email'
                                                        key={"email"}
                                                        value={values.email}
                                                        onchange={handleChange("email")}
                                                        onblur={handleBlur("email")}
                                                        placeholder="Digite o seu email"
                                                        touched={touched.email}
                                                        errors={errors.email}
                                                    /> */}



                                                    <InputEditar
                                                        id='data_nascimento'
                                                        titulo_label='Data de nascimento'
                                                        type='date'
                                                        key={"data_nascimento"}
                                                        value={values.data_nascimento}
                                                        onchange={handleChange("data_nascimento")}
                                                        onblur={handleBlur("data_nascimento")}
                                                        placeholder=""
                                                        touched={touched.data_nascimento}
                                                        errors={errors.data_nascimento}
                                                    />


                                                    {classe === "FUNCIONARIO" ?
                                                        <SelectClasseFUNCIONARIO
                                                            value={values.classe}
                                                            onchange={handleChange("classe")}
                                                            onblur={handleBlur("classe")}
                                                            touched={touched.classe}
                                                            errors={errors.classe}
                                                        />
                                                        :
                                                        classe === "ADMIN" ?
                                                            <SelectClasseADMIN
                                                                value={values.classe}
                                                                onchange={handleChange("classe")}
                                                                onblur={handleBlur("classe")}
                                                                touched={touched.classe}
                                                                errors={errors.classe}
                                                            />
                                                            :
                                                            <SelectClasse
                                                                value={values.classe}
                                                                onchange={handleChange("classe")}
                                                                onblur={handleBlur("classe")}
                                                                touched={touched.classe}
                                                                errors={errors.classe}
                                                            />
                                                    }


                                                    {classe === "FUNCIONARIO" ?
                                                        <SelectCursoFUNCIONARIO
                                                            value={values.curso}
                                                            onchange={handleChange("curso")}
                                                            onblur={handleBlur("curso")}
                                                            touched={touched.curso}
                                                            errors={errors.curso}
                                                        />
                                                        :
                                                        classe === "ADMIN" ?
                                                            <SelectCursoADMIN
                                                                value={values.classe}
                                                                onchange={handleChange("classe")}
                                                                onblur={handleBlur("classe")}
                                                                touched={touched.classe}
                                                                errors={errors.classe}
                                                            />
                                                            :
                                                            <SelectCurso
                                                                value={values.classe}
                                                                onchange={handleChange("classe")}
                                                                onblur={handleBlur("classe")}
                                                                touched={touched.classe}
                                                                errors={errors.classe}
                                                            />
                                                    }



                                                </div>


                                                <Button
                                                    nome='Editar perfil'
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
                } else {
                    return (
                        <React.Fragment>

                        </React.Fragment>
                    )
                }



            })}

        </React.Fragment>
    )
}


import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string, number, date } from 'yup';
import { api } from '../../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import SelectTipoDocumento from './SelectTipoDocumento';
import SelectTipoOndePerdeu from './SelectTipoOndePerdeu';
import { useStoreToken } from '../../../../store/StoreToken/StoreRota';
import { useStoreRota } from '../../../../store/StoreRota/StoreRota';


export default function CriarPerdido() {

    const navigate = useNavigate()
    const [dataUtilizador, setDataUtilizador] = useState<any[]>([])
    const [token] = useStoreToken((state) => [state.token])
    const [rota] = useStoreRota((state) => [state.rota])
    const [emailUtilizador, setEmailUtilizador] = useState("")

    const fileRef = useRef<HTMLInputElement>(null)

    const callBack = useCallback(async () => {

        const response = await api.get(`/publico/listar_todos_${rota}`)
        const newData = response.data
        setDataUtilizador(newData)

    }, [rota])


    useEffect(() => {
        callBack()
    }, [callBack])

    useEffect(() => {
        setEmailUtilizador(String(`${localStorage.getItem("@Auth:email")}`))
    }, [])



    const SchemaCriarContaEstudante = object({
        nome_documento: string().required("Nome é um campo obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres").max(40, "O nome deve ter no máximo 40 caracteres"),
        email: string().required("Email é um campo obrigatório").email(),
        numero_identificacao: string().required("Numero identificacao é um campo obrigatório").min(3, "A numero identificacao deve ter pelo menos 3 caracteres").max(40, "A numero identificacao deve ter no máximo 40 caracteres"),
        tipo_documento: string().required("Tipo de documento é um campo obrigatório").min(3, "O tipo de documento deve ter pelo menos 3 caracteres").max(20, "O tipo de documento deve ter no máximo 40 caracteres"),
        onde_perdeu: string().required("Perdeu é um campo obrigatório").min(3, "O perdeu deve ter pelo menos 3 caracteres").max(20, "O perdeu deve ter no máximo 40 caracteres"),
        telefone: number().min(111111111, "Telefone deve ser maior ou igual a 111111111").max(999999999, "O telefone deve ser menor ou igual a 999999999").required("Telefone é um campo obrigatório"),
        filiacao: string().required("Filiacao é um campo obrigatório").min(4, "A filiacao passe deve ter pelo menos 4 caracteres").max(40, "A filiacao passe deve ter no máximo 40 caracteres"),
        descricao: string().required("Descricao é um campo obrigatório").min(20, "A descricao passe deve ter pelo menos 4 caracteres").max(500, "A descricao passe deve ter no máximo 500 caracteres"),
        data_perdeu: date().required("Data de nascimento é um campo obrigatório")
    })


    return (
        <div className=''>
            <div className='bg-indigo-100 flex items-center justify-center h-full'>

                <section className="w-[100%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">CRIAR OBJECTO PERDIDO</h1>

                    <Formik
                        initialValues={{
                            nome_documento: "",
                            email: "",
                            numero_identificacao: "",
                            telefone: null,
                            tipo_documento: "",
                            descricao: "",
                            filiacao: "",
                            onde_perdeu: "",
                            data_perdeu: new Date(),
                            foto: "",
                            file: ""
                        }}
                        validationSchema={SchemaCriarContaEstudante}
                        validateOnChange
                        onSubmit={async values => {

                            const formData = new FormData()
                            formData.append("foto", values.file)
                            formData.append("tipo_documento", values.tipo_documento)
                            formData.append("nome_documento", values.nome_documento)
                            formData.append("numero_identificacao", values.numero_identificacao)
                            formData.append("filiacao", values.filiacao)
                            formData.append("data_perdeu", String(new Date(values.data_perdeu)))
                            formData.append("telefone", String(values.telefone))
                            formData.append("onde_perdeu", values.onde_perdeu)
                            formData.append("email", values.email)
                            formData.append("descricao", values.descricao)




                            dataUtilizador.map(async ({ id, email }: { id: string, email: string }) => {

                                if (email === emailUtilizador) {

                                    const result_api = await api.post(`/${rota}/criar_documento_perdido_${rota}/${id}`,
                                        formData
                                        ,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`
                                            }
                                        }
                                    )

                                    if (result_api.data) {

                                        toast.success('Objeto criado')

                                        setTimeout(() => {

                                            return navigate(`/suchen/${rota}/perdido`)

                                        }, 2500)

                                    } else {
                                        console.log(result_api)
                                    }
                                } else {
                                    return null
                                }

                            })




                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (

                            <Form className="">

                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                                    <Input
                                        id='nome_documento'
                                        titulo_label='Nome'
                                        type='text'
                                        key={"nome_documento"}
                                        onchange={handleChange("nome_documento")}
                                        onblur={handleBlur("nome_documento")}
                                        placeholder="Digite o nome que esta no documento"
                                        touched={touched.nome_documento}
                                        errors={errors.nome_documento}
                                    />

                                    <Input
                                        id='email'
                                        titulo_label='Email'
                                        type='email'
                                        key={"email"}
                                        onchange={handleChange("email")}
                                        onblur={handleBlur("email")}
                                        placeholder="Digite o seu email"
                                        touched={touched.email}
                                        errors={errors.email}
                                    />

                                    <Input
                                        id='numero_identificacao'
                                        titulo_label='Número identificação'
                                        type='text'
                                        key={"numero_identificacao"}
                                        onchange={handleChange("numero_identificacao")}
                                        onblur={handleBlur("numero_identificacao")}
                                        placeholder="Digite o número identificação que esta no documento"
                                        touched={touched.numero_identificacao}
                                        errors={errors.numero_identificacao}
                                    />


                                    <Input
                                        id='telefone'
                                        titulo_label='Telefone'
                                        type='number'
                                        key={"telefone"}
                                        onchange={handleChange("telefone")}
                                        onblur={handleBlur("telefone")}
                                        placeholder="Digite seu número de telefone"
                                        touched={touched.telefone}
                                        errors={errors.telefone}
                                    />

                                    <Input
                                        id='data_perdeu'
                                        titulo_label='Data que perdeu o documento'
                                        type='date'
                                        key={"data_perdeu"}
                                        onchange={handleChange("data_perdeu")}
                                        onblur={handleBlur("data_perdeu")}
                                        placeholder=""
                                        touched={touched.data_perdeu}
                                        errors={errors.data_perdeu}
                                    />

                                    <Input
                                        id='filiacao'
                                        titulo_label='Filiação'
                                        type='text'
                                        key={"filiacao"}
                                        onchange={handleChange("filiacao")}
                                        onblur={handleBlur("filiacao")}
                                        placeholder="Digite o nome dos pais que esta no documento"
                                        touched={touched.filiacao}
                                        errors={errors.filiacao}
                                    />



                                    <SelectTipoDocumento
                                        onchange={handleChange("tipo_documento")}
                                        onblur={handleBlur("tipo_documento")}
                                        touched={touched.tipo_documento}
                                        errors={errors.tipo_documento}
                                    />

                                    <SelectTipoOndePerdeu
                                        onchange={handleChange("onde_perdeu")}
                                        onblur={handleBlur("onde_perdeu")}
                                        touched={touched.onde_perdeu}
                                        errors={errors.onde_perdeu}
                                    />

                                    <div className='w-full'>
                                        <label htmlFor="descricao">Descrição</label>
                                        <textarea
                                            placeholder='Descrição do objecto'
                                            onChange={handleChange("descricao")}
                                            onBlur={handleBlur("descricao")}
                                            className='block  w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring resize-none'
                                            name="descricao"
                                            id="descricao"
                                            cols={30}
                                            rows={10}
                                        >
                                        </textarea>
                                        {touched.descricao && errors.descricao && <div className="font-medium">{String(errors.descricao)}</div>}
                                    </div>

                                    <div className="mb-6 ">
                                        <label
                                            className="text-black dark:text-gray-200 font-medium"
                                        >Foto</label>
                                        <input
                                            ref={fileRef}
                                            name="foto"
                                            hidden
                                            type="file"
                                            value={values.foto}

                                            onChange={(e) => {
                                                if (e.target.files === null) {

                                                } else {
                                                    setFieldValue("file", e.target.files[0])
                                                    // console.log(e.target.files[0].name)
                                                }

                                            }}

                                        />
                                        <label
                                            onClick={() => {
                                                fileRef?.current?.click()
                                            }}
                                            htmlFor="file"
                                        >
                                            <div

                                                className="mt-2 w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                                                                focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                                                                disabled:cursor-not-allowed text-center">
                                                Carregar foto
                                            </div>
                                        </label>
                                        {touched.foto && errors.foto && <div className="font-medium">{String(errors.foto)}</div>}

                                    </div>
                                </div>




                                <Button
                                    nome={"Criar objecto"}
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


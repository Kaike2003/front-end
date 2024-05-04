import React, { useCallback, useEffect, useRef, useState } from 'react'
import InputEditar from './InputEditar'
import Button from './Button'
import { Formik, Form } from 'formik';
import { object, string, number, date } from 'yup';
import { api } from '../../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import SelectTipoOndePerdeu from './SelectTipoOndePerdeu';
import { useStoreRota } from '../../../../store/StoreRota/StoreRota';
import { StoreIdDocumento } from "../../../../store/StoreIdDocumento/StoreIdDocumento"
import dateFormat from 'dateformat';
import SelectTipoDocumentoEditar from './SelectTipoDocumentoEditar';
import { useStoreAtualizar } from '../../../../store/StoreAtualizar/StoreAtualizar';


export default function EditarPerdido() {

    const navigate = useNavigate()
    const [dataUtilizador, setDataUtilizador] = useState<any[]>([])
    const [rota] = useStoreRota((state) => [state.rota])
    const [emailUtilizador, setEmailUtilizador] = useState("")
    const fileRef = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<any[]>([])
    const [atualizar, setAtualizar] = useStoreAtualizar((state) => [state.atualizar, state.setAtualizar])



    const [token, setToken] = useState("")
    const [tipo_utilizador, setTipoUtilizador] = useState("")
    const [idUtilizador, setIdUtilizador] = useState("")
    const [idDocumento] = StoreIdDocumento((state) => [state.idDocumento])


    useEffect(() => {
        const storageToken = localStorage.getItem("@Auth:token")
        const storage__Id = localStorage.getItem("@Auth:__id")
        const storageTipoUtilizador = localStorage.getItem("@Auth:tipo_utilizador")
        const storageEmailUtilizador = localStorage.getItem("@Auth:email")


        setToken(`${storageToken}`)
        setIdUtilizador(`${storage__Id}`)
        setTipoUtilizador(`${storageTipoUtilizador}`)
        setEmailUtilizador(`${storageEmailUtilizador}`)
    }, [])


    const callBackDados = useCallback(async () => {


        if (idUtilizador === localStorage.getItem("@Auth:__id")) {

            const response = await api.get(`/${tipo_utilizador}/listar_documento_perdido_${tipo_utilizador}/${idUtilizador}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newData = response.data
            setData(newData)

        }


    }, [idUtilizador, tipo_utilizador, token])


    useEffect(() => {
        callBackDados()
    }, [callBackDados])

    const callBack = useCallback(async () => {

        const response = await api.get(`/publico/listar_todos_${rota}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const newData = response.data
        setDataUtilizador(newData)

    }, [rota, token])

    useEffect(() => {
        callBack()
    }, [callBack])



    const SchemaCriarContaEstudante = object({
        nome_documento: string().required("Nome é um campo obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres").max(40, "O nome deve ter no máximo 40 caracteres"),
        email: string().required("Email é um campo obrigatório").email(),
        numero_identificacao: string().required("Numero identificacao é um campo obrigatório").min(3, "A numero identificacao deve ter pelo menos 3 caracteres").max(40, "A numero identificacao deve ter no máximo 40 caracteres"),
        tipo_documento: string().required("Tipo de documento é um campo obrigatório").min(3, "O tipo de documento deve ter pelo menos 3 caracteres").max(20, "O tipo de documento deve ter no máximo 40 caracteres"),
        onde_perdeu: string().required("Perdeu é um campo obrigatório").min(3, "O perdeu deve ter pelo menos 3 caracteres").max(40, "O perdeu deve ter no máximo 40 caracteres"),
        telefone: number().min(111111111, "Telefone deve ser maior ou igual a 111111111").max(999999999, "O telefone deve ser menor ou igual a 999999999").required("Telefone é um campo obrigatório"),
        filiacao: string().required("Filiacao é um campo obrigatório").min(4, "A filiacao passe deve ter pelo menos 4 caracteres").max(400, "A filiacao passe deve ter no máximo 40 caracteres"),
        descricao: string().required("Descricao é um campo obrigatório").min(20, "A descricao passe deve ter pelo menos 4 caracteres").max(400, "A descricao passe deve ter no máximo 400 caracteres"),
        data_perdeu: date().required("Data de nascimento é um campo obrigatório"),
    })


    return (
        <React.Fragment>

            {data.map(({
                id,
                nome,
                email,
                numero_identificacao,
                telefone,
                tipo_documento,
                descricao,
                filicao,
                local,
                data,
                foto,
                file
            }: {
                id: string,
                nome: string,
                email: string,
                numero_identificacao: string,
                telefone: number,
                tipo_documento: string,
                descricao: string,
                filicao: string,
                local: string,
                data: string,
                foto: string,
                file: string,
            }) => {

                const valores = {
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
                }

                const dadosSalvos = {
                    nome_documento: nome,
                    email: email,
                    numero_identificacao: numero_identificacao,
                    telefone: telefone,
                    tipo_documento: tipo_documento,
                    descricao: descricao,
                    filiacao: filicao,
                    onde_perdeu: local,
                    data_perdeu: dateFormat(new Date(data), "yyyy-mm-dd"),
                    foto: "",
                    file: foto
                }






                if (id === idDocumento) {
                    return (
                        <div className=''>
                            <div className='bg-indigo-100 flex items-center justify-center h-full'>

                                <section className="w-[100%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">EDITAR OBJECTO PERDIDO</h1>
                                    <Formik
                                        initialValues={dadosSalvos || valores}
                                        validationSchema={SchemaCriarContaEstudante}
                                        // validateOnChange
                                        enableReinitialize
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

                                                    const result_api = await api.put(`/${rota}/atualizar_documento_perdido_${rota}/${id}/${idDocumento}`,
                                                        formData
                                                        ,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`
                                                            }
                                                        }
                                                    )

                                                    if (result_api.data) {

                                                        toast.success('Objeto editado')

                                                        if (atualizar === false) {
                                                            setAtualizar(true)
                                                        } else {
                                                            setAtualizar(false)
                                                        }

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

                                                    <InputEditar
                                                        id='nome_documento'
                                                        titulo_label='Nome'
                                                        type='text'
                                                        value={values.nome_documento}
                                                        key={"nome_documento"}
                                                        onchange={handleChange("nome_documento")}
                                                        onblur={handleBlur("nome_documento")}
                                                        placeholder="Digite o nome que esta no documento"
                                                        touched={touched.nome_documento}
                                                        errors={errors.nome_documento}
                                                    />

                                                    <InputEditar
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
                                                    />

                                                    <InputEditar
                                                        id='numero_identificacao'
                                                        titulo_label='Número identificação'
                                                        type='text'
                                                        key={"numero_identificacao"}
                                                        value={values.numero_identificacao}
                                                        onchange={handleChange("numero_identificacao")}
                                                        onblur={handleBlur("numero_identificacao")}
                                                        placeholder="Digite o número identificação que esta no documento"
                                                        touched={touched.numero_identificacao}
                                                        errors={errors.numero_identificacao}
                                                    />


                                                    <InputEditar
                                                        id='telefone'
                                                        titulo_label='Telefone'
                                                        type='number'
                                                        key={"telefone"}
                                                        value={values.telefone}
                                                        onchange={handleChange("telefone")}
                                                        onblur={handleBlur("telefone")}
                                                        placeholder="Digite seu número de telefone"
                                                        touched={touched.telefone}
                                                        errors={errors.telefone}
                                                    />

                                                    <InputEditar
                                                        id='data_perdeu'
                                                        titulo_label='Data que perdeu o documento'
                                                        type='date'
                                                        key={"data_perdeu"}
                                                        value={values.data_perdeu}
                                                        onchange={handleChange("data_perdeu")}
                                                        onblur={handleBlur("data_perdeu")}
                                                        placeholder=""
                                                        touched={touched.data_perdeu}
                                                        errors={errors.data_perdeu}
                                                    />

                                                    <InputEditar
                                                        id='filiacao'
                                                        titulo_label='Filiação'
                                                        type='text'
                                                        key={"filiacao"}
                                                        value={values.filiacao}
                                                        onchange={handleChange("filiacao")}
                                                        onblur={handleBlur("filiacao")}
                                                        placeholder="Digite o nome dos pais que esta no documento"
                                                        touched={touched.filiacao}
                                                        errors={errors.filiacao}
                                                    />



                                                    <SelectTipoDocumentoEditar
                                                        value={values.tipo_documento}
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
                                                            value={values.descricao}
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
                                                    nome='Editar objecto'
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


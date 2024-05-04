import React, { useCallback, useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { Formik, Form } from 'formik';
import { api } from '../../../../services/api/getToken';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import SelectTipoOndePerdeu from './SelectTipoOndePerdeu';
import { useStoreRota } from '../../../../store/StoreRota/StoreRota';
import { StoreIdDocumento } from "../../../../store/StoreIdDocumento/StoreIdDocumento"
import dateFormat from 'dateformat';
import SelectTipoDocumento from './SelectTipoDocumento';
import "../../../../css/style.css"


export default function DeletarPerdido() {

    const navigate = useNavigate()
    const [dataUtilizador, setDataUtilizador] = useState<any[]>([])
    const [rota] = useStoreRota((state) => [state.rota])
    const [emailUtilizador, setEmailUtilizador] = useState("")
    const [data, setData] = useState<any[]>([])


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
                file: string
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

                                    <h1 className="text-xl font-bold text-black capitalize dark:text-white">DELETAR OBJECTO PERDIDO</h1>

                                    <Formik
                                        initialValues={dadosSalvos || valores}
                                        // validateOnChange
                                        enableReinitialize
                                        onSubmit={async values => {



                                            dataUtilizador.map(async ({ id, email }: { id: string, email: string }) => {

                                                if (email === emailUtilizador) {
                                                    const result_api = await api.delete(`/${tipo_utilizador}/deletar_perdi_um_documento/${idUtilizador}/${idDocumento}`
                                                    )

                                                    if (result_api.data) {

                                                        toast.success('Objeto deletado')

                                                        setTimeout(() => {

                                                            return navigate(`/suchen/${tipo_utilizador}/perdido`)

                                                        }, 500)

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
                                                        value={values.nome_documento}
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
                                                        value={values.email}
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
                                                        value={values.numero_identificacao}
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
                                                        value={values.telefone}
                                                        onchange={handleChange("telefone")}
                                                        onblur={handleBlur("telefone")}
                                                        placeholder="943162154"
                                                        touched={touched.telefone}
                                                        errors={errors.telefone}
                                                    />

                                                    <Input
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

                                                    <Input
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



                                                    <SelectTipoDocumento
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
                                                            disabled
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

                                                        <img
                                                            className='imagemDetalhe_perdido mt-2'
                                                            src={`http://localhost:8888/public/carregado/perdido/${foto}`}
                                                            alt={descricao}
                                                        />

                                                    </div>
                                                </div>




                                                <Button
                                                    nome='Deletar'
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


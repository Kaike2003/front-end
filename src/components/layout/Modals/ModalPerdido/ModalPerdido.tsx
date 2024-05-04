import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { api } from '../../../../services/api/getToken'
import { IDocumentoAchado } from '../../../../interface'
import "../../../../css/style.css"
import { useStoreModalPerdido } from '../../../../store/StoreModalPerdido/StoreModalPerdido'
import { useStoreAtualizar } from '../../../../store/StoreAtualizar/StoreAtualizar'
import toast from 'react-hot-toast'
import { useStoreRota } from '../../../../store/StoreRota/StoreRota'

export default function ModalPerdido() {

    const [documento, setDocumento] = useState<any[]>([])
    const [utilizadorId, setUtilizadorId] = useState("")
    const [rota] = useStoreRota((state) => [state.rota])
    const [telefone, setTelefone] = useState(0)
    const [atualizar, setAtualizar] = useStoreAtualizar((state) => [state.atualizar, state.setAtualizar])

    const [abrirPerdido, fecharModalPerdido, documento_id_perdido] = useStoreModalPerdido((state) => [
        state.abrirPerdido,
        state.fecharModalPerdido,
        state.documento_id_perdido
    ])


    const callBack = useCallback(async () => {
        setUtilizadorId(String(localStorage.getItem("@Auth:__id")))
        const response = await api.get("/publico/listar_todos_perdidos")
        const newData = response.data
        setDocumento(newData)
    }, [])

    useEffect(() => {
        callBack()
    }, [callBack, atualizar])


    const pegarTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (telefone <= 1111111111 || telefone >= 999999999) {
            return setTelefone(Number(e.target.value))
        } else {
            return setTelefone(0)
        }

    }

    const handleSubmit = async () => {

        // console.log("id " + utilizadorId)
        // console.log(`/${rota}/pertence_esta_comigo/${utilizadorId}/${documento_id_perdido}`)

        const response = await api.put(`/${rota}/pertence_esta_comigo/${utilizadorId}/${documento_id_perdido}`, {
            telefone: Number(telefone)
        }).then((sucesso) => {

            toast.success("Conseguiste verificar o seu documento, agora va para o seu email")

            if (atualizar === false) {
                setAtualizar(true)
            } else {
                setAtualizar(true)
            }

            fecharModalPerdido(false)

        }).catch((error) => {
            console.log(error)
        })


    }



    return (
        <div>
            {documento.map(({ foto, id, nome, descricao }: IDocumentoAchado) => {

                if (documento_id_perdido === id) {

                    return (
                        <Transition
                            key={id}
                            appear show={abrirPerdido} as={Fragment}>
                            <Dialog 
                            key={id}
                            as="div" className="relative z-10"
                                onClose={fecharModalPerdido}
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    {nome}

                                                </Dialog.Title>


                                                <div className="mt-1">


                                                    <p className='w-full justify-center rounded-md border border-transparent  px-0 py-1 text-sm font-medium text-black-900  focus:outline-none focus-visible:ring-2
                                                focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                                                disabled:cursor-not-allowed'>

                                                    </p>




                                                    <div
                                                        style={{ cursor: "pointer" }}
                                                        className="group max-w-full relative  flex flex-col items-center justify-center  p-1 text-black-500 hover:bg-gray-200 hover:text-black
                                            
                                             w-full  border-transparent bg-blue-100 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2
                                                focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                                                disabled:cursor-not-allowed
                                                mb-2 rounded-md
                                            " >

                                                        <p className="">Detalhes</p>

                                                        <div className="
                                                
                                                absolute top-10 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100
                                                
                                                
                                                ">

                                                            <div className="
                                                        
                                                        mt-1 mb-2 w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                                                focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                                                disabled:cursor-not-allowed">{descricao}</div>

                                                        </div>
                                                    </div>





                                                    <div>
                                                        <img
                                                            className="imagemDetalhe rounded-md"
                                                            src={`http://localhost:8888/public/carregado/perdido/${foto}`}
                                                            alt={descricao}


                                                        />
                                                    </div>

                                                    <div className='mt-2'>
                                                        <input
                                                            placeholder='Nº documento ou filiaçao'
                                                            className='w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                                                focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                                                disabled:cursor-not-allowed'/>
                                                    </div>

                                                    <div className='mt-2'>
                                                        <input
                                                            placeholder='Telefone'
                                                            className='w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                                                focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                                                disabled:cursor-not-allowed'
                                                            onChange={pegarTelefone}
                                                        />
                                                    </div>

                                                    <div className='mt-2'>
                                                        <button
                                                            onClick={handleSubmit}
                                                            className='w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                                                focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                                                disabled:cursor-not-allowed'> Está comigo</button>
                                                    </div>







                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )

                } else {
                    return <React.Fragment></React.Fragment>
                }


            })}

        </div>
    )
}


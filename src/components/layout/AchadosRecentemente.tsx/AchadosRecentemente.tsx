import React, { useCallback, useEffect, useState } from 'react'
import EstruturaObjecto from '../EstruturaObjecto/EstruturaObjecto';
import { api } from '../../../services/api/getToken';
import { IData } from '../../../interface';
import { useStoreAtualizar } from '../../../store/StoreAtualizar/StoreAtualizar';

export default function AchadosRecentemente() {

    const [dataAchado, setDataAchado] = useState<any[]>([])
    const [atualizar] = useStoreAtualizar((state) => [state.atualizar])


    const callBack = useCallback(async () => {
        const response = await api.get("/publico/listar_todos_achados_limite/8")
        const newData = response.data
        setDataAchado(newData)
    }, [])


    useEffect(() => {
        callBack()
    }, [callBack, atualizar])

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Achados recentemente</h1>

                </div>
                <div className="flex flex-wrap -m-4 text-center">

                    {dataAchado.map(({ id, achado, aprovado, foto, descricao, entregue, nome, publicado }: IData) => {

                        if (entregue === false && aprovado === true && publicado === true && achado === true) {

                            return (
                                <React.Fragment key={id + foto}>
                                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                        <EstruturaObjecto
                                            key={id}
                                            id={id}
                                            nome={nome}
                                            achado={achado}
                                            descricao={descricao}
                                            foto={foto}
                                        />
                                    </div>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment>
                                </React.Fragment>
                            )
                        }


                    })}



                </div>
            </div>
        </section>
    )
}


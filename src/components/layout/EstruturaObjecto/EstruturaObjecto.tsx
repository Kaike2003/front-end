import React from 'react'
import "../../../css/style.css"
import { IEstruturaObjecto } from '../../../interface'
import { useModalAchado } from '../../../store/StoreModalAchado/StoreModalAchado'
import { useStoreModalPerdido } from '../../../store/StoreModalPerdido/StoreModalPerdido'

function EstruturaObjecto({ id, foto, nome, achado, perdido, descricao }: IEstruturaObjecto) {
    const [abrirModalAchado, setDocumentoIdAchado] = useModalAchado((state) => [state.abrirModalAchado, state.setDocumentoIdAchado])

    const [abrirModalPerdido, setDocumentoIdPerdido] = useStoreModalPerdido((state) => [state.abrirModalPerdido, state.setDocumentoIdPerdido])

    return (
        <div key={id}>

            <div key={id}>
                {achado === true ? <div
                    key={"id" + new Date().getMilliseconds()}
                    onClick={() => {
                        abrirModalAchado(true)
                        setDocumentoIdAchado(id)
                    }}
                    className='break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl max-w-[20rem] mb-4 bg-blue-100 text-black dark:bg-slate-800 dark:text-white cursor-pointer'>
                    <div className='flex items-center justify-between font-medium p-4'>
                        <span className='uppercase text-xs'>
                            <div
                                className='uppercase text-xs text-green-500'
                            >Achado
                            </div>
                        </span>
                        <span className='text-xs text-slate-500'>{nome}</span>
                    </div>
                    <div className='px-4 flex flex-row items-center space-x-3'>

                        <span className='text-base font-medium 
        
                limitarLetras'>{descricao}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <img
                            className='imgObjectoPerdido rounded-xl'

                            src={`http://localhost:8888/public/carregado/achado/${foto}`}
                            alt={descricao}

                        />

                    </div>
                </div > :
                    <React.Fragment />
                }
            </div>

            <div>
                {perdido === true ? <div
                    key={id}
                    onClick={() => {
                        abrirModalPerdido(true)
                        setDocumentoIdPerdido(id)
                    }}
                    className='break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl max-w-[20rem] mb-4 bg-blue-100 text-black dark:bg-slate-800 dark:text-white cursor-pointer'>
                    <div className='flex items-center justify-between font-medium p-4'>
                        <span className='uppercase text-xs'>
                            <div
                                className='uppercase text-xs text-red-500'
                            >Perdido</div>
                        </span>
                        <span className='text-xs text-slate-500'>{nome}</span>
                    </div>
                    <div className='px-4 flex flex-row items-center space-x-3'>

                        <span className='text-base font-medium 
        
                limitarLetras'>{descricao}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <img
                            className='imgObjectoPerdido rounded-xl'

                            src={`http://localhost:8888/public/carregado/perdido/${foto}`}
                            alt={descricao}

                        />

                    </div>
                </div > : <React.Fragment />}
            </div>



        </div>
    )
}

export default EstruturaObjecto
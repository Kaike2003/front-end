import React from 'react'
import { TbFileHorizontal } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useStoreRota } from '../../../store/StoreRota/StoreRota';

export default function CategoriaDetalhes() {

    const [rota] = useStoreRota((state) => [state.rota])


    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Categorias</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Detalhes da quantidade de objectos perdidos e achado que estão cadastrados na suchen.</p>
                </div>
                <div className="flex flex-wrap -m-4 text-center">
                    
                   
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <TbFileHorizontal size={25} />
                                </svg>
                                <h2 className="title-font font-medium text-3xl text-gray-900">2.7K</h2>
                                <p className="leading-relaxed">Bilhete de identidade</p>
                            </div>
                        </div>
                 
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                <TbFileHorizontal size={25} />
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">1.3K</h2>
                            <p className="leading-relaxed">Livrete</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                <TbFileHorizontal size={25} />
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">74</h2>
                            <p className="leading-relaxed">Passaporte</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                <TbFileHorizontal size={25} />
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">46</h2>
                            <p className="leading-relaxed">Carta de condução</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


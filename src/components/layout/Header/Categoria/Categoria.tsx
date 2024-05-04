import React from 'react'
import { styled } from "styled-components"
import { useStoreRota } from '../../../../store/StoreRota/StoreRota'
import { NavLink } from 'react-router-dom'
import "../../../../css/style.css"

const DivElemento = styled.div`
    margin-top: 20px ;
    width: 100%;
    display: flex;
    align-items: flex-start;

    @media only screen and (max-width: 600px) {
        margin: auto;
        display: flex;
        flex-direction: column;
}
`

export default function Categoria() {

    const [rota] = useStoreRota((state) => [state.rota])


    return (
        <DivElemento
        // className="mt-4 flex gap-x-8 items-center justify-between"
        >

            <div id='menu' className="flex gap-x-8 categorias">
                <NavLink to={`/suchen/${rota}/bilheteIdentidade`}>
                    <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 limitar">Bilhete de identidade</span>
                </NavLink>

                <NavLink to={`/suchen/${rota}/livrete`}>
                    <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">Livrete</span>
                </NavLink>

                <NavLink to={`/suchen/${rota}/passaPorte`}>
                    <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">Passaporte</span>
                </NavLink>


                <NavLink to={`/suchen/${rota}/cartaConducao`}>
                    <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 limitar">Carta de condução</span>
                </NavLink>

            </div>


        </DivElemento>
    )
}


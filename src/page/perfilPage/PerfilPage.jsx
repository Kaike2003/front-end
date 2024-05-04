import React from 'react'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Editar from '../../components/layout/Perfil/Editar'
import PalavraPasse from '../../components/layout/Perfil/PalavraPasse'
import Telefone from '../../components/layout/Perfil/Telefone'
import Email from '../../components/layout/Perfil/Email'

function PerfilPage() {

    return (
        <React.Fragment>
            <Header />
            <div className='flex flex-row'>
                <Editar />
                <PalavraPasse />
                <Telefone />
                <Email />
            </div>

            <div className='mt-3'>
                <Outlet />
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default PerfilPage
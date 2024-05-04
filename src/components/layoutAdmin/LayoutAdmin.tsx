import React from 'react'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import Utilizadores from '../../page/admin/AdminLayoutTabelas/Utilizadores/Utilizadores'
import Achados from '../../page/admin/AdminLayoutTabelas/Achados/Achados'
import Perdidos from '../../page/admin/AdminLayoutTabelas/Perdidos/Perdidos'
import { Outlet } from 'react-router-dom'

function LayoutAdmin() {
    return (
        <React.Fragment>
            <Header />
            <div className='flex flex-row '>
                <Utilizadores />
                <Achados />
                <Perdidos />
            </div>
            <div className='mt-3'>
                <Outlet />
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default LayoutAdmin
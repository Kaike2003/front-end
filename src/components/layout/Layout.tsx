
import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import CategoriaDetalhes from './CategoriaDetalhes/CategoriaDetalhes'
import Mensagem from './Mensagem/Mensagem'
import AchadosRecentemente from './AchadosRecentemente.tsx/AchadosRecentemente'


export default function Layout() {

   

    return (
        <React.Fragment>
            <Header />
            <Mensagem />
            <AchadosRecentemente />
            <CategoriaDetalhes />
            <Footer />
        </React.Fragment>
    )
}


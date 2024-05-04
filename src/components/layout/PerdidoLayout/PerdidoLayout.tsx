import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SectionPerdido from './SectionPerdido/SectionPerdido'
import TabelaPerdido from '../Tabelas/TabelaPerdido'
export default function PerdidoLayout() {

    return (
        <React.Fragment>
            <Header />
            <SectionPerdido />
            <TabelaPerdido />
            <Footer />
        </React.Fragment>
    )
}

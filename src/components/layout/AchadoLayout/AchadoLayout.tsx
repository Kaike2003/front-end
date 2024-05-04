import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SectionAchado from './SectionAchado/SectionAchado'
import TabelaAchado from '../Tabelas/TabelaAchado'

export default function AchadoLayout() {

    return (
        <React.Fragment>
            <Header />
            <SectionAchado />
            <TabelaAchado />
            <Footer />
        </React.Fragment>
    )
}

import React from 'react'
import { useStoreCategoria } from '../../../../store/StoreCategoria/StoreCategoria'
import PassaPortePerdidoPage from '../../../../page/PerdidoLayoutPage/CategoriasPerdidoPage/PassaPortePerdidoPage/PassaPortePerdidoPage'
import PassaPorteAchadoPage from '../../../../page/AchadoLayoutPage/CategoriasAchadoPage/PassaPorteAchadoPage/PassaPorteAchadoPage'

export default function PassaPorte() {
    const [categoria] = useStoreCategoria((state) => [state.categoria])
    return (
        <div>
            {categoria === false ?
                <PassaPortePerdidoPage /> :
                <PassaPorteAchadoPage />
            }
        </div>
    )
}


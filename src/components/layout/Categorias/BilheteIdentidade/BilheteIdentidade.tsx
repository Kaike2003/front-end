import React from 'react'
import { useStoreCategoria } from '../../../../store/StoreCategoria/StoreCategoria'
import BilheteIdentidadePerdidoPage from '../../../../page/PerdidoLayoutPage/CategoriasPerdidoPage/BilheteIdentidadePerdidoPage/BilheteIdentidadePerdidoPage'
import BilheteIdentidadeAchadoPage from '../../../../page/AchadoLayoutPage/CategoriasAchadoPage/BilheteIdentidadeAchadoPage/BilheteIdentidadeAchadoPage'


export default function BilheteIdentidade() {
    const [categoria] = useStoreCategoria((state) => [state.categoria])
   
    return (
        <div>
            
            {categoria === false ?
                <BilheteIdentidadePerdidoPage /> :
                <BilheteIdentidadeAchadoPage />
            }
        </div>
    )
}


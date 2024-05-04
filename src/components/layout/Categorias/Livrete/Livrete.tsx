import React from 'react'
import { useStoreCategoria } from '../../../../store/StoreCategoria/StoreCategoria'
import LivretePerdidoPage from '../../../../page/PerdidoLayoutPage/CategoriasPerdidoPage/LivretePerdidoPage/LivretePerdidoPage'
import LivreteAchadoPage from '../../../../page/AchadoLayoutPage/CategoriasAchadoPage/LivreteAchadoPage/LivreteAchadoPage'

export default function Livrete() {
    const [categoria] = useStoreCategoria((state) => [state.categoria])
    return (
        <div>
            {categoria === false ?
                <LivretePerdidoPage /> :
                <LivreteAchadoPage />
            }
        </div>
    )
}


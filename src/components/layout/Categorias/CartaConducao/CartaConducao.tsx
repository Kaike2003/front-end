import React from 'react'
import { useStoreCategoria } from '../../../../store/StoreCategoria/StoreCategoria'
import CartaConducaoPerdidoPage from '../../../../page/PerdidoLayoutPage/CategoriasPerdidoPage/CartaConducaoPerdidoPage/CartaConducaoPerdidoPage'
import CartaConducaoAchadoPage from '../../../../page/AchadoLayoutPage/CategoriasAchadoPage/CartaConducaoAchadoPage/CartaConducaoAchadoPage'

export default function CartaConducao() {
    const [categoria] = useStoreCategoria((state) => [state.categoria])
    return (
        <div>
            {categoria === false ?
                <CartaConducaoPerdidoPage /> :
                <CartaConducaoAchadoPage />
            }
        </div>
    )
}


import React from 'react'
import { useStoreRota } from '../../../../store/StoreRota/StoreRota'
import { Link } from 'react-router-dom'


export default function SectionPerdido() {

    const [rota] = useStoreRota((state) => [state.rota])

    return (
        <React.Fragment>

            <Link
                className="inline-flex items-center px-8 py-3 text-white transition bg-gray-900 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-gray-800 mt-2 mb-2 ms-5"
                to={`/suchen/${rota}/perdido/criar`}
            >
                <span className="text-sm font-medium"> Criar </span>

            </Link>

        </React.Fragment>
    )
}


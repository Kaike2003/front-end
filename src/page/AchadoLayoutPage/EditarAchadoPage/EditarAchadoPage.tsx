import React from 'react'
import Header from '../../../components/layout/Header/Header'
import { Link } from 'react-router-dom'
import { useStoreRota } from '../../../store/StoreRota/StoreRota'
import EditarAchado from '../../../components/layout/AchadoLayout/EditarAchado/EditarAchado'

export default function EditarAchadoPage() {
    const [rota] = useStoreRota((state) => [state.rota])
    return (
        <div className='flex flex-col justify-between gap-5'>
            <div className=''>
                <Header />
            </div>


            <div>
                <Link
                    className="px-8 py-3 text-white transition bg-gray-900 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-gray-800 mt-2  ms-5"
                    to={`/suchen/${rota}/achado`}
                >
                    <span className="text-sm font-medium"> Voltar </span>

                </Link>
            </div>


            <div>
                <EditarAchado />
            </div>
        </div>
    )
}


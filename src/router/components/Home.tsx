import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                <h1 className="mb-4 text-4xl font-bold">SUCHEN</h1>
                <p className="text-gray-600">Escolha um tipo de conta e use a nossa aplicação.</p>
                <div className='flex justify-center gap-4'>
                    <Link to="/suchen/estudante/login" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Estudante </Link>
                    <Link to="/suchen/funcionario/login" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Funcionario </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
import React from 'react'

export default function Button({ nome}: { nome: string }) {
    return (
        <div className="flex justify-end mt-6">
            <button
                type='submit'
                className="px-6 py-2 leading-5 bg-red-600 text-white transition-colors duration-200 transform  rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-600
                font-medium
                ">
                {nome}
            </button>

        </div>
    )
}


import React from 'react'

export default function SelectClasse() {
    return (
        <div>
            <label className="text-black font-medium dark:text-gray-200" htmlFor="passwordConfirmation">Classe</label>
            <select
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring
            ">
                <option selected value={"FUNCIONARIO"}>FUNCIONÁRIO</option>
            </select>


        </div >

    )
}


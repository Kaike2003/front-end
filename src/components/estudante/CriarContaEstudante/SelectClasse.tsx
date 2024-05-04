
import React from 'react'
import { ISelect } from '../../../interface'

export default function SelectClasse({ touched, errors, onblur, onchange }: ISelect) {
    return (
        <div>
            <label className="text-black font-medium dark:text-gray-200" htmlFor="passwordConfirmation">Classe</label>
            <select
                onChange={(e) => { onchange(e) }}
                onBlur={(e) => { onblur(e) }}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring
            ">
                <option value={""}>Escolha a sua classe</option>
                <option value={"DECIMA"}>10ª classe</option>
                <option value={"PRIMEIRA"}>11ª classe</option>
                <option value={"SEGUNDA"}>12ª classe</option>
                <option value={"TERCEIRA"}>13ª classe</option>
            </select>

            {touched && errors && <div className="font-medium">{String(errors)}</div>}

        </div >

    )
}


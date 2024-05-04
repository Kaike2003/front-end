
import React from 'react'
import { ISelect } from '../../../interface'

export default function SelectTipoDocumento({ touched, errors, value, onblur, onchange }: ISelect) {
    return (
        <div>
            <label className="text-black font-medium dark:text-gray-200" htmlFor="passwordConfirmation">Tipo de documento</label>
            <select
                disabled
                value={value}
                onChange={(e) => { onchange(e) }}
                onBlur={(e) => { onblur(e) }}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring
            ">
                <option value={""}>Escolha o tipo de documento</option>
                <option value={"BILHETE_IDENTIDADE"}>Bilhete de identidade</option>
                <option value={"LIVRETE"}>Livrete</option>
                <option value={"PASSAPORTE"}>Passaporte</option>
                <option value={"CARTA_CONDUCAO"}>Carta de condução</option>
            </select>

            {touched && errors && <div className="font-medium">{String(errors)}</div>}

        </div >

    )
}


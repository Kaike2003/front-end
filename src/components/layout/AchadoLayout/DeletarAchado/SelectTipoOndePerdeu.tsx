
import React from 'react'
import { ISelect } from '../../../../interface'

export default function SelectTipoOndePerdeu({ touched, errors, onblur, onchange }: ISelect) {
    return (
        <div>
            <label className="text-black font-medium dark:text-gray-200" htmlFor="passwordConfirmation">Local</label>
            <select
                disabled
                onChange={(e) => { onchange(e) }}
                onBlur={(e) => { onblur(e) }}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring
            ">
                <option value={""}>Escolha o lugar onde perdeu</option>
                <option value={"IPPDF"}>IPDDF</option>

            </select>

            {touched && errors && <div className="font-medium">{String(errors)}</div>}

        </div >

    )
}


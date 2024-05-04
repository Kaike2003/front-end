import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../../../css/style.css"


function Achados() {
    return (
        <div className='flex justify-between place-items-center mx-5 mt-2 menu'>
            <NavLink
                to={`/suchen/admin/dashboard/achados`}
                className="inline-flex items-center px-8 py-3 text-white transition bg-gray-900 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-gray-800 cursor-pointer"
                onClick={() => { }}
            >
                <span className="text-sm font-medium"> Achados </span>

            </NavLink>
            <div>
            </div>
        </div>
    )
}

export default Achados
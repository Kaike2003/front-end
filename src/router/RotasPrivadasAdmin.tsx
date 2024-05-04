import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AutenticacaoContext";


function RotasPrivadasAdmin() {

    const { logadoAdmin } = useContext(AuthContext)

    return (
        logadoAdmin ? <Outlet /> : <Navigate to={"/suchen/admin"} />
    )
}

export default RotasPrivadasAdmin
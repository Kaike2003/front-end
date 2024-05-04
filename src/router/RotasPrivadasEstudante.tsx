import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AutenticacaoContext";


function RotasPrivadasEstudante() {

    const { logadoEstudante } = useContext(AuthContext)

    return (
        logadoEstudante ? <Outlet /> : <Navigate to={"/suchen/estudante"} />
    )
}

export default RotasPrivadasEstudante
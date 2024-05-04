import React, { useContext, } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AutenticacaoContext";


function RotasPrivadasFuncionario() {

    const { logadoFuncionario } = useContext(AuthContext)

    return (
        logadoFuncionario ? <Outlet /> : <Navigate to={"/suchen/funcionario"} />
    )
}

export default RotasPrivadasFuncionario
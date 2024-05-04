import React from "react"
import { Route, Routes } from "react-router-dom"
import Teste from "../components/Teste"
import CriarContaAdminPage from "../page/admin/CriarContaAdminPage/CriarContaAdminPage"
import AutenticarContaAdminPage from "../page/admin/AutenticarContaAdminPage/AutenticarContaAdminPage"
import RecuperarPalavraPasseAdminPage from "../page/admin/RecuperarPalavraPasseAdminPage/RecuperarPalavraPasseAdminPage"
import LoginContaAdminPage from "../page/admin/LoginContaAdminPage/LoginContaAdminPage"
import CriarContaEstudantePage from "../page/estudante/CriarContaEstudantePage/CriarContaEstudantePage"
import AutenticarContaEstudantePage from "../page/estudante/AutenticarContaEstudantePage/AutenticarContaEstudantePage"
import RecuperarPalavraPasseEstudantePage from "../page/estudante/RecuperarPalavraPasseEstudantePage/RecuperarPalavraPasseEstudantePage"
import LoginContaEstudantePage from "../page/estudante/LoginContaEstudantePage/LoginContaEstudantePage"
import RotasPrivadasEstudante from "./RotasPrivadasEstudante"
import RotasPrivadasAdmin from "./RotasPrivadasAdmin"
import CriarContaFuncionarioPage from "../page/funcionario/CriarContaFuncionarioPage/CriarContaFuncionarioPage"
import AutenticarContaFuncionarioPage from "../page/funcionario/AutenticarContaFuncionarioPage/AutenticarContaFuncionarioPage"
import RecuperarPalavraPasseFuncionarioPage from "../page/funcionario/RecuperarPalavraPasseFuncionarioPage/RecuperarPalavraPasseFuncionarioPage"
import LoginContaFuncionarioPage from "../page/funcionario/LoginContaFuncionarioPage/LoginContaFuncionarioPage"
import RotasPrivadasFuncionario from "./RotasPrivadasFuncionario"
import LayoutPage from "../page/layout/LayoutPage"
import PerdidoLayoutPage from "../page/PerdidoLayoutPage/PerdidoLayoutPage"
import CriarPerdidoPage from "../page/PerdidoLayoutPage/CriarPerdidoPage/CriarPerdidoPage"
import EditarPerdidoPage from "../page/PerdidoLayoutPage/EditarPerdidoPage/EditarPerdidoPage"
import DetalhesPerdidoPage from "../page/PerdidoLayoutPage/DetalhesPerdidoPage/DetalhesPerdidoPage"
import DeletarPerdidoPage from "../page/PerdidoLayoutPage/DeletarPerdidoPage/DeletarPerdidoPage"
import CriarAchadoPage from "../page/AchadoLayoutPage/CriarAchadoPage/CriarAchadoPage"
import EditarAchadoPage from "../page/AchadoLayoutPage/EditarAchadoPage/EditarAchadoPage"
import DetalhesAchadoPage from "../page/AchadoLayoutPage/DetalhesAchadoPage/DetalhesAchadoPage"
import DeletarAchadoPage from "../page/AchadoLayoutPage/DeletarAchadoPage/DeletarAchadoPage"
import AchadoLayoutPage from "../page/AchadoLayoutPage/AchadoLayoutPage"
import BilheteIdentidade from "../components/layout/Categorias/BilheteIdentidade/BilheteIdentidade"
import Livrete from "../components/layout/Categorias/Livrete/Livrete"
import PassaPorte from "../components/layout/Categorias/PassaPorte/PassaPorte"
import CartaConducao from "../components/layout/Categorias/CartaConducao/CartaConducao"
import LayoutAdminPage from "../page/layoutAdmin/LayoutAdminPage"
import TabelaUtilizadores from "../components/layout/Tabelas/TabelaUtilizadores"
import TabelaAchadoAdmin from "../components/layout/Tabelas/TabelaAchadoAdmin"
import TabelaPerdidoAdmin from "../components/layout/Tabelas/TabelaPerdidoAdmin"
import DeletarAchadoAdmin from "../page/admin/DeletarAchadoAdmin/DeletarAchadoAdmin"
import DeletarPerdidoAdmin from "../page/admin/DeletarPerdidoAdmin/DeletarPerdidoAdmin"
import PerfilPage from "../page/perfilPage/PerfilPage"
import EditarPerfil from "../components/layout/Perfil/EditarPerfil/EditarPerfil"
import PalavraPassePerfil from "../components/layout/Perfil/PalavraPassePerfil/PalavraPassePerfil"
import TelefonePerfil from "../components/layout/Perfil/TelefonePerfil/TelefonePerfil"
import EmailPerfil from "../components/layout/Perfil/EmailPerfil/EmailPerfil"
import Home from "./components/Home"



export default function Router() {

    const caminho_principal = "suchen"
    const caminho_principal_admin = "suchen/admin"
    const caminho_principal_estudante = "suchen/estudante"
    const caminho_principal_funcionario = "suchen/funcionario"


    return (
        <Routes>


            <Route
                path="/"
                Component={Home}
            />

            <Route
                path="*"
                Component={Home}
            />

            {/* Rotas para quem esta logado como administrador na suchen */}


            <Route
                path="/suchen/admin"
                Component={RotasPrivadasAdmin}
            >


                <Route
                    index
                    Component={LayoutPage}
                />

                <Route
                    path="perdido"
                    Component={PerdidoLayoutPage}
                />

                <Route
                    path="perdido/criar"
                    Component={CriarPerdidoPage}
                />

                <Route
                    path="perdido/editar"
                    Component={EditarPerdidoPage}
                />

                <Route
                    path="perdido/detalhes"
                    Component={DetalhesPerdidoPage}
                />

                <Route
                    path="perdido/deletar"
                    Component={DeletarPerdidoPage}
                />

                <Route
                    path="achado"
                    Component={AchadoLayoutPage}
                />

                <Route
                    path="achado/criar"
                    Component={CriarAchadoPage}
                />

                <Route
                    path="achado/editar"
                    Component={EditarAchadoPage}
                />

                <Route
                    path="achado/detalhes"
                    Component={DetalhesAchadoPage}
                />

                <Route
                    path="achado/deletar"
                    Component={DeletarAchadoPage}
                />


                <Route
                    path="bilheteIdentidade"
                    Component={BilheteIdentidade}
                />

                <Route
                    path="livrete"
                    Component={Livrete}
                />

                <Route
                    path="passaporte"
                    Component={PassaPorte}
                />

                <Route
                    path="cartaConducao"
                    Component={CartaConducao}
                />

                <Route path="dashboard"
                    Component={LayoutAdminPage}
                >

                    <Route path="utilizadores"
                        Component={TabelaUtilizadores}
                    />

                    <Route path="achados"
                        Component={TabelaAchadoAdmin}
                    />

                    <Route path="achados/deletar"
                        Component={DeletarAchadoAdmin}
                    />

                    <Route path="perdidos"
                        Component={TabelaPerdidoAdmin}
                    />

                    <Route path="perdidos/deletar"
                        Component={DeletarPerdidoAdmin}
                    />


                </Route>

                <Route path="perfil"
                    Component={PerfilPage}
                >
                    <Route path="editar"
                        Component={EditarPerfil}
                    />


                    <Route
                        path="palavrapasse"
                        Component={PalavraPassePerfil}
                    />

                    <Route
                        path="telefone"
                        Component={TelefonePerfil}
                    />

                    <Route
                        path="email"
                        Component={EmailPerfil}
                    />


                </Route>



            </Route  >



            {/* Rotas para quem esta logado como estudante na suchen */}

            <Route
                path="/suchen/estudante"
                Component={RotasPrivadasEstudante}
            >

                <Route
                    index
                    Component={LayoutPage}
                />

                <Route
                    path="perdido"
                    Component={PerdidoLayoutPage}
                />

                <Route
                    path="perdido/criar"
                    Component={CriarPerdidoPage}
                />

                <Route
                    path="perdido/editar"
                    Component={EditarPerdidoPage}
                />

                <Route
                    path="perdido/detalhes"
                    Component={DetalhesPerdidoPage}
                />

                <Route
                    path="perdido/deletar"
                    Component={DeletarPerdidoPage}
                />

                <Route
                    path="achado"
                    Component={AchadoLayoutPage}
                />

                <Route
                    path="achado/criar"
                    Component={CriarAchadoPage}
                />

                <Route
                    path="achado/editar"
                    Component={EditarAchadoPage}
                />

                <Route
                    path="achado/detalhes"
                    Component={DetalhesAchadoPage}
                />

                <Route
                    path="achado/deletar"
                    Component={DeletarAchadoPage}
                />


                <Route
                    path="bilheteIdentidade"
                    Component={BilheteIdentidade}
                />

                <Route
                    path="livrete"
                    Component={Livrete}
                />

                <Route
                    path="passaporte"
                    Component={PassaPorte}
                />

                <Route
                    path="cartaConducao"
                    Component={CartaConducao}
                />

                <Route path="perfil"
                    Component={PerfilPage}
                >
                    <Route path="editar"
                        Component={EditarPerfil}
                    />


                    <Route
                        path="palavrapasse"
                        Component={PalavraPassePerfil}
                    />

                    <Route
                        path="telefone"
                        Component={TelefonePerfil}
                    />

                    <Route
                        path="email"
                        Component={EmailPerfil}
                    />


                </Route>


            </Route>


            {/* Rotas para quem esta logado como funcionario na suchen */}


            <Route
                path="/suchen/funcionario"
                Component={RotasPrivadasFuncionario}
            >

                <Route
                    index
                    Component={LayoutPage}
                />

                <Route
                    path="perdido"
                    Component={PerdidoLayoutPage}
                />


                <Route
                    path="perdido/criar"
                    Component={CriarPerdidoPage}
                />

                <Route
                    path="perdido/editar"
                    Component={EditarPerdidoPage}
                />

                <Route
                    path="perdido/detalhes"
                    Component={DetalhesPerdidoPage}
                />

                <Route
                    path="perdido/deletar"
                    Component={DeletarPerdidoPage}
                />

                <Route
                    path="achado"
                    Component={AchadoLayoutPage}
                />

                <Route
                    path="achado/criar"
                    Component={CriarAchadoPage}
                />

                <Route
                    path="achado/editar"
                    Component={EditarAchadoPage}
                />

                <Route
                    path="achado/detalhes"
                    Component={DetalhesAchadoPage}
                />

                <Route
                    path="achado/deletar"
                    Component={DeletarAchadoPage}
                />


                <Route
                    path="bilheteIdentidade"
                    Component={BilheteIdentidade}
                />

                <Route
                    path="livrete"
                    Component={Livrete}
                />

                <Route
                    path="passaporte"
                    Component={PassaPorte}
                />

                <Route
                    path="cartaConducao"
                    Component={CartaConducao}
                />

                <Route path="perfil"
                    Component={PerfilPage}
                >
                    <Route path="editar"
                        Component={EditarPerfil}
                    />


                    <Route
                        path="palavrapasse"
                        Component={PalavraPassePerfil}
                    />

                    <Route
                        path="telefone"
                        Component={TelefonePerfil}
                    />

                    <Route
                        path="email"
                        Component={EmailPerfil}
                    />


                </Route>

            </Route>






            <Route
                path={`/${caminho_principal}`}
                Component={Teste}
            />


            {/* Rotas do administrador */}


            <Route
                path={`/${caminho_principal_admin}/criar`}
                Component={CriarContaAdminPage}
            />

            <Route
                path={`/${caminho_principal_admin}/autenticar_conta`}
                Component={AutenticarContaAdminPage}
            />

            <Route
                path={`/${caminho_principal_admin}/recuperar_palavra_passe`}
                Component={RecuperarPalavraPasseAdminPage}
            />

            <Route
                path={`/${caminho_principal_admin}/login`}
                Component={LoginContaAdminPage}
            />


            {/* Rotas do estudante */}

            <Route
                path={`/${caminho_principal_estudante}/criar`}
                Component={CriarContaEstudantePage}
            />

            <Route
                path={`/${caminho_principal_estudante}/autenticar_conta`}
                Component={AutenticarContaEstudantePage}
            />

            <Route
                path={`/${caminho_principal_estudante}/recuperar_palavra_passe`}
                Component={RecuperarPalavraPasseEstudantePage}
            />

            <Route
                path={`/${caminho_principal_estudante}/login`}
                Component={LoginContaEstudantePage}
            />


            {/* Rotas do funcionario */}

            <Route
                path={`/${caminho_principal_funcionario}/criar`}
                Component={CriarContaFuncionarioPage}
            />

            <Route
                path={`/${caminho_principal_funcionario}/autenticar_conta`}
                Component={AutenticarContaFuncionarioPage}
            />

            <Route
                path={`/${caminho_principal_funcionario}/recuperar_palavra_passe`}
                Component={RecuperarPalavraPasseFuncionarioPage}
            />

            <Route
                path={`/${caminho_principal_funcionario}/login`}
                Component={LoginContaFuncionarioPage}
            />





        </Routes >
    )

}
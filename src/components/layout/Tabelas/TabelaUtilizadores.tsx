import React from 'react'
import { useMemo, useEffect, useCallback, useState } from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { api } from '../../../services/api/getToken';
import { Box, IconButton, Tooltip } from '@mui/material';
import dateFormat from 'dateformat';
import { useStoreAtualizar } from '../../../store/StoreAtualizar/StoreAtualizar';
import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';
import toast from 'react-hot-toast';

type TUtilizadores = {
    id: string
    nome: string
    email: string
    telefone: string
    tipo_utilizador: string
    curso: string
    data_nascimento: string
    banido: string
};



function TabelaUtilizadores() {

    const [data, setData] = useState<any>({})
    const [atualizar, setAtualizar] = useStoreAtualizar((state) => [state.atualizar, state.setAtualizar])
    const [token, setToken] = useState("")

    const callBackToken = useCallback(() => {
        const storageToken = localStorage.getItem("@Auth:token")

        setToken(`${storageToken}`)
    }, [])

    useEffect(() => {
        callBackToken()
    }, [callBackToken, atualizar])



    const callBack = useCallback(async () => {


        const response = await api.get("/publico/listar_todos_utilizadores")
        const newData = response.data
        setData(newData)


    }, [])

    useEffect(() => {
        callBack()
    }, [callBack, atualizar])

    const dataValue: TUtilizadores[] = data

    const columns = useMemo<MRT_ColumnDef<TUtilizadores>[]>(() => [

        {
            accessorKey: 'nome',
            header: 'Nome',
            size: 210,
        },

        {
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        color: '#121212',
                        maxWidth: '9ch',
                        p: '0.25rem',
                    })}
                >
                    {cell.getValue<string>()}
                </Box>
            ),


            accessorKey: 'email',
            header: 'Email',
            size: 20,
        },


        {
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        color: '#121212',
                        maxWidth: '9ch',
                        p: '0.25rem',
                    })}
                >
                    {cell.getValue<number>()}
                </Box>
            ),


            accessorKey: 'telefone',
            header: 'Telefone',
            size: 0
        },

        {
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        color: '#121212',
                        maxWidth: '9ch',
                        p: '0.25rem',
                    })}
                >
                    {cell.getValue<number>()?.toLocaleString?.('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                </Box>
            ),


            accessorKey: 'tipo_utilizador',
            header: 'Tipo de utilizador',
            size: 0,
        },

        {
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        color: '#121212',
                        maxWidth: '9ch',
                        p: '0.25rem',
                    })}
                >
                    {cell.getValue<number>()?.toLocaleString?.('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                </Box>
            ),


            accessorKey: 'curso',
            header: 'Curso',
            size: 0,
        },

        {
            accessorKey: 'data_nascimento',
            header: 'Data de nascimento',
            size: 0,
            Cell: ({ cell }) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        color: '#121212',
                        maxWidth: '9ch',
                        p: '0.25rem',
                    })}
                >
                    {dateFormat(cell.getValue<string>(), "dd-mm-yyyy")}
                </Box>
            ),
        },




    ], [])


    return <MaterialReactTable

        muiTableHeadProps={{

        }}
        // initialState={{ pagination: { pageSize: 6, pageIndex: 1 } }}
        renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0px' }}>


                {row.original?.tipo_utilizador === "ADMIN" ? <React.Fragment /> :
                    row.original?.banido === "TRUE" ?
                        < Tooltip placement="right" title="Dar acesso">
                            <IconButton color="success"
                                onClick={async () => {

                                    await api.put(`/admin/banirUtilizador_admin/${row.original.id}`
                                        , {
                                            headers: {
                                                Authorization: `Bearer ${token}`
                                            }
                                        }
                                    ).then((sucesso) => {

                                        if (atualizar === false) {
                                            setAtualizar(true)
                                        } else {
                                            setAtualizar(false)
                                        }

                                        toast.success("Acesso concebido")

                                    }).catch((error) => {
                                        console.log(error)
                                    })


                                }}
                            >
                                <DoneIcon />
                            </IconButton>
                        </ Tooltip>
                        :

                        < Tooltip placement="right" title="Banir">
                            <IconButton color="error"
                                onClick={async () => {

                                    await api.put(`/admin/banirUtilizador_admin/${row.original.id}`
                                        , {
                                            headers: {
                                                Authorization: `Bearer ${token}`
                                            }
                                        }
                                    ).then(async (sucesso) => {

                                        if (atualizar === false) {
                                            setAtualizar(true)
                                        } else {
                                            setAtualizar(false)
                                        }

                                        toast.success("Utilizador banido")

                                    }).catch((error) => {
                                        console.log(error)
                                    })

                                }}
                            >
                                <BlockIcon />
                            </IconButton>
                        </ Tooltip>
                }



            </Box >
        )
        }
        enableRowActions
        columns={columns}
        data={dataValue}
    />



}

export default TabelaUtilizadores
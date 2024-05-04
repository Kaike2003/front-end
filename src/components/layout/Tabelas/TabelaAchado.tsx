import React, { useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { api } from '../../../services/api/getToken';
import { Box, IconButton, Tooltip } from '@mui/material';
import dateFormat from 'dateformat';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { StoreIdDocumento } from '../../../store/StoreIdDocumento/StoreIdDocumento';
import { useNavigate } from 'react-router-dom';

type ObjectoPerdido = {
    id: string
    nome: string
    foto: string
    observacao: string
    achado: boolean
    publicado: boolean
    aprovado: boolean
    tipo_documento: string
    data: Date
};


export default function TabelaAchado() {

    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [tipo_utilizador, setTipoUtilizador] = useState("")
    const [idUtilizador, setIdUtilizador] = useState("")

    const [setIdDocumento] = StoreIdDocumento((state) => [state.setIdDocumento])

    const [data, setData] = useState<any>({})

    useEffect(() => {
        const storageToken = localStorage.getItem("@Auth:token")
        const storage__Id = localStorage.getItem("@Auth:__id")
        const storageTipoUtilizador = localStorage.getItem("@Auth:tipo_utilizador")

        setToken(`${storageToken}`)
        setIdUtilizador(`${storage__Id}`)
        setTipoUtilizador(`${storageTipoUtilizador}`)
    }, [])

    const callBack = useCallback(async () => {

        if (token === localStorage.getItem("@Auth:token")) {

            const response = await api.get(`${tipo_utilizador}/listar_documento_achado_${tipo_utilizador}/${idUtilizador}`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const newData = response.data
            setData(newData)
        } else {
            return null
        }

    }, [token, tipo_utilizador, idUtilizador])

    useEffect(() => {
        callBack()
    }, [callBack])

    const dataValue: ObjectoPerdido[] = data

    const columns = useMemo<MRT_ColumnDef<ObjectoPerdido>[]>(() => [

        {
            accessorKey: 'nome',
            header: 'Nome',
            size: 230,
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


            accessorKey: 'aprovado',
            header: 'Aprovado',
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


            accessorKey: 'tipo_documento',
            header: 'Tipo de documento',
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


            accessorKey: 'publicado',
            header: 'Publicado',
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


            accessorKey: 'entregue',
            header: 'Entregue',
            size: 0,
        },

        {
            accessorKey: 'data',
            header: 'Data',
            size: 150,
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

                < Tooltip placement="right" title="Detalhes">
                    <IconButton color="info"
                        onClick={() => {
                            setIdDocumento(`${row.original.id}`)
                            navigate(`/suchen/${tipo_utilizador}/achado/detalhes`)
                        }}
                    >
                        <MoreHorizRoundedIcon />
                    </IconButton>
                </ Tooltip>


                < Tooltip placement="right" title="Editar">
                    <IconButton color="primary"
                        onClick={() => {
                            setIdDocumento(`${row.original.id}`)
                            navigate(`/suchen/${tipo_utilizador}/achado/editar`)
                        }}
                    >
                        <CreateRoundedIcon />
                    </IconButton>
                </ Tooltip>

                < Tooltip placement="right" title="Deletar">
                    <IconButton color="error"
                        onClick={() => {
                            setIdDocumento(`${row.original.id}`)
                            navigate(`/suchen/${tipo_utilizador}/achado/deletar`)
                        }}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                </ Tooltip>




            </Box>
        )
        }
        enableRowActions
        columns={columns}
        data={dataValue}
    />
}


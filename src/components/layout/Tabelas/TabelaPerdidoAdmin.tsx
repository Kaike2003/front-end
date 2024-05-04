import React from 'react'
import { useMemo, useEffect, useCallback, useState } from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { api } from '../../../services/api/getToken';
import { Box, IconButton, Tooltip } from '@mui/material';
import dateFormat from 'dateformat';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useStoreAtualizar } from '../../../store/StoreAtualizar/StoreAtualizar';
import { StoreIdDocumento } from '../../../store/StoreIdDocumento/StoreIdDocumento';
import { useNavigate } from 'react-router-dom';

type TPerdido = {
    id: string
    nome: string
    perdido: boolean
    publicado: boolean
    aprovado: boolean
    tipo_documento: string
    data: Date
};



function TabelaPerdidoAdmin() {

    const navigate = useNavigate()

    const [data, setData] = useState<any>({})
    const [atualizar] = useStoreAtualizar((state) => [state.atualizar])
    const [setIdDocumento] = StoreIdDocumento((state) => [state.setIdDocumento])



    const callBack = useCallback(async () => {


        const response = await api.get("/publico/listar_todos_perdidos")
        const newData = response.data
        setData(newData)


    }, [])

    useEffect(() => {
        callBack()
    }, [callBack, atualizar])

    const dataValue: TPerdido[] = data

    const columns = useMemo<MRT_ColumnDef<TPerdido>[]>(() => [

        {
            accessorKey: 'nome',
            header: 'Nome',
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


            accessorKey: 'tipo_documento',
            header: 'Tipo de documento',
            size: 10
        }
        ,

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
            size: 10,
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


            accessorKey: 'perdido',
            header: 'Perdido',
            size: 10,
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
                            navigate("/suchen/admin/dashboard/perdidos/deletar")
                        }}
                    >
                        <MoreHorizRoundedIcon />
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

export default TabelaPerdidoAdmin
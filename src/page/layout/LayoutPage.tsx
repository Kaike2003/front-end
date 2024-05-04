import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useStoreAtualizar } from '../../store/StoreAtualizar/StoreAtualizar'


export default function LayoutPage() {


    const [atualizar, setAtualizar] = useStoreAtualizar((state) => [state.atualizar, state.setAtualizar])


    const callBack = useCallback(() => {

        if (atualizar === false) {
            return setAtualizar(true)
        } else {
            return setAtualizar(false)
        }
    }, [])

    useEffect(() => {
        callBack()
    }, [callBack, atualizar])



    return (
        <React.Fragment>
            <Layout />
        </React.Fragment>
    )
}


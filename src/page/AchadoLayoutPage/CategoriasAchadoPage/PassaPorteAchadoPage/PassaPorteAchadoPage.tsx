import React from 'react'
import Header from '../../../../components/layout/Header/Header'
import "../../../../css/style.css"
import { useStoreCategoria } from '../../../../store/StoreCategoria/StoreCategoria'
import PassaPorteAchado from '../../../../components/layout/AchadoLayout/AchadoCategorias/PassaPorteAchado/PassaPorteAchado'
import { useStorePassaPorte } from '../../../../store/StorePassaPorte/StorePesquisarPassaPorte'
import { useStorePesquisar } from '../../../../store/StorePesquisar/StorePesquisar'
import { useStoreData } from '../../../../store/StoreData/StoreData'
import { api } from '../../../../services/api/getToken'


function PassaPorteAchadoPage() {

  const [categoria, setCategoria] = useStoreCategoria((state) => [state.categoria, state.setCategoria])

  const [pesquisarPassaPorteAchado, setPesquisarPassaPorteAchado] = useStorePassaPorte((state) => [state.pesquisarPassaPorteAchado, state.setPesquisarPassaPorteAchado])

  const [pesquisar, setPesquisar] = useStorePesquisar((state => [state.pesquisar, state.setPesquisar]))

  const [setData] = useStoreData((state) => [state.setData])


  async function fecth() {

    if (categoria === true) {
      setCategoria(false)
    } else {
      setCategoria(true)
    }

  }

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className='flex justify-between place-items-center mx-5 mt-2'>
        <div className='flex gap-4'>
          <div
            className="inline-flex items-center px-8 py-3 text-white transition bg-gray-900 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-gray-800 cursor-pointer"
            onClick={fecth}
          >
            <span className="text-sm font-medium"> Perdido </span>
          </div>
          {pesquisarPassaPorteAchado === true ?

            <div
              className="inline-flex items-center px-8 py-3 text-white transition bg-red-600 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-red-700 cursor-pointer"
              onClick={() => {
                setPesquisarPassaPorteAchado(false)
                setPesquisar("")
              }}
            >
              <span className="text-sm font-medium"> Cancelar pesquisa </span>

            </div>
            :
            <React.Fragment />
          }
        </div>
        <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Pesquisar"
          value={pesquisar}
          onChange={(e) => {
            setPesquisar(e.target.value)
          }}
          onKeyDown={async (e) => {
            if (e.code === "Enter") {
              if (pesquisarPassaPorteAchado === false) {
                if (pesquisar.length >= 3) {

                  const response = await api.post("/publico/listar_todos_pesquisado", {
                    pesquisar: pesquisar,
                    tipo_documento: "PASSAPORTE",
                    achado: true,
                    perdido: false
                  })

                  setData(response.data)

                }


                setPesquisarPassaPorteAchado(true)
                setPesquisar("")
              } else {

                if (pesquisar.length >= 3) {

                  const response = await api.post("/publico/listar_todos_pesquisado", {
                    pesquisar: pesquisar,
                    tipo_documento: "PASSAPORTE",
                    achado: true,
                    perdido: false
                  })

                  setData(response.data)

                }

                setPesquisar("")
                setPesquisarPassaPorteAchado(true)
              }
            }
          }}
        />
      </div>


      <div className='page'>

        <div className='divScroll'>

          <PassaPorteAchado />
        </div>
      </div>
    </div>
  )
}

export default PassaPorteAchadoPage
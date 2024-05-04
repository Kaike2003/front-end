import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import EstruturaObjecto from '../../../EstruturaObjecto/EstruturaObjecto';
import { IData } from '../../../../../interface';
import "../../../../../css/style.css"
import { useStoreData } from '../../../../../store/StoreData/StoreData';

function LivretePerdidoPesquisado() {

    const [data] = useStoreData((state) => [state.data])

    async function fetchData() {

    }

    return (
        <div
            id="scrollableDiv"
            className='scroll-smooth focus:scroll-auto scrollableDiv'
            style={{
                height: 580,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                padding: "10px",
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap" }} //To put endMessage and loader to the top.
                hasMore={true}
                loader={<h4>...</h4>}
                endMessage={<h4>Sem mais tarefas</h4>}
                scrollableTarget="scrollableDiv"
            >
                {data.map(({ id, aprovado, foto, descricao, entregue, nome, publicado, perdido, achado }: IData) => {

                    if (entregue === false && aprovado === true && publicado === true && perdido === true) {

                        return (
                            <React.Fragment>
                                <div className="p-4 md:w-full sm:w-1/2 w-full">
                                    <EstruturaObjecto
                                        id={id}
                                        nome={nome}
                                        perdido={perdido}
                                        achado={achado}
                                        descricao={descricao}
                                        foto={foto}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment>
                            </React.Fragment>
                        )
                    }


                })}
                <div></div>
            </InfiniteScroll>
        </div>
    )

}

export default LivretePerdidoPesquisado
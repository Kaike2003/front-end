import React from "react";
import { useState } from "react";

export default function PrevisualizarFoto({ file }: { file: any }) {

    const [previsualizar, setPrevisualizar] = useState<string | ArrayBuffer | null>(() => {
        return null
    })

    const ler = new FileReader()
    ler.readAsDataURL(file)
    ler.onload = () => {
        setPrevisualizar(ler.result)
    }

    return (
        <>
            <div className="mb-4">
                <img
                    src={String(previsualizar)}
                    alt="imagem"
                    style={{ objectFit: "cover" }}
                    width={"765px"}
                    height={"763px"}
                ></img>
            </div>
        </>
    )

}
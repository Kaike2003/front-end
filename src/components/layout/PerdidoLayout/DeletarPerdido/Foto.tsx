import React from 'react'

function Foto() {
    return (
        <div className="mb-6 ">
            <label className="mb-5 block font-medium">
                foto
            </label>

            <div className="mb-8">
                <input type="file" name="file" id="file" className="sr-only" />
                <label
                    htmlFor="file"
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                    <div>

                        <span
                            className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                        >
                            Carregar
                        </span>
                    </div>
                </label>
            </div>


        </div>
    )
}

export default Foto
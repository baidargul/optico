'use client'
import { ComboBoxProvider } from '@/components/ComboBox/ComboBoxProvider'
import { formalizeText } from '@/lib/my'
import { nature } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {}

const Natures = (props: Props) => {
    const [processedNatures, setProcessedNatures] = useState([] as any)
    const [natures, setNatures] = useState([] as any)
    const [selectedNature, setSelectedNature] = useState("")

    useEffect(() => {

        const getNatures = async () => {
            await axios.get(`/api/definitions/nature/find/findall/`).then(async (res: any) => {
                const data = await res.data
                if (data.status === 200) {
                    setNatures(data.data)
                } else {
                    setNatures([])
                }
            })
        }

        getNatures()

    }, [])


    useEffect(() => {
        doProcessNatures(natures, setProcessedNatures)
    }, [natures])

    return (
        processedNatures && processedNatures.length > 0 && <div>
            <ComboBoxProvider content={processedNatures} returnLabel setValue={setSelectedNature} align='start' >
                <div className='w-full border rounded h-8 flex items-center pl-2'>
                    {selectedNature}
                </div>
            </ComboBoxProvider>
        </div >
    )
}

export default Natures

function doProcessNatures(natures: any, setProcessedNatures: any) {
    let processed = [] as any
    natures.map((nature: nature) => {
        const data = {
            name: String(nature.name).toLocaleLowerCase(),
            label: formalizeText(nature.name)
        }
        processed.push(data)
    })
    setProcessedNatures(processed)
}
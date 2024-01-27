import PreviewBoolean from '@/components/PreviewControls/PreviewBoolean'
import PreviewMultipleSelection from '@/components/PreviewControls/PreviewMultipleSelection'
import PreviewSingleSelection from '@/components/PreviewControls/PreviewSingleSelection'
import PreviewTextBox from '@/components/PreviewControls/PreviewTextBox'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    id: string,
}

const Dynamic = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [properties, setProperties] = useState<any>([])
    const [values, setValues] = useState<any>([])

    useEffect(() => {
        fetchProperties()
        setIsMounted(true)
    }, [props.id])

    const fetchProperties = async () => {
        const data = {
            id: props.id
        }
        try {
            await axios.post(`/api/definitions/category/find/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    if (response.data) {
                        setProperties(response.data.properties)
                    }
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.warning(error.message)
        }
    }





    return (
        isMounted && properties &&
        <div>
            <div className='grid grid-cols-2 gap-2'>
                {
                    properties.map((property: any) => {
                        switch (property.type) {
                            case "text":
                                return (
                                    <div className='p-1 bg-zinc-50 rounded border hover:drop-shadow-md' key={property.id}>
                                        <PreviewTextBox property={property} values={values} setValues={setValues} />
                                    </div>
                                )
                            case "number":
                                return (
                                    <div className='p-1 bg-zinc-50 rounded border hover:drop-shadow-md' key={property.id}>
                                        <PreviewTextBox property={property} values={values} setValues={setValues} />
                                    </div>
                                )
                            case "single selection":
                                return (
                                    <div className='p-1 bg-zinc-50 rounded border hover:drop-shadow-md' key={property.id} >
                                        <PreviewSingleSelection property={property} values={values} setValues={setValues} />
                                    </div>
                                )
                            case "multiple selection":
                                return (
                                    <div className='p-1 bg-zinc-50 rounded border hover:drop-shadow-md' key={property.id} >
                                        <PreviewMultipleSelection property={property} values={values} setValues={setValues} />
                                    </div>
                                )
                            case "boolean":
                                return (
                                    <div className='p-1 bg-zinc-50 rounded border hover:drop-shadow-md' key={property.id} >
                                        <PreviewBoolean property={property} values={values} setValues={setValues} />
                                    </div>
                                )
                            default:
                                break;
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Dynamic
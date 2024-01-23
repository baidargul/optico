'use client'
import { formalizeText } from '@/lib/my'
import { propertyOptions } from '@prisma/client'
import { FileCode, FileDigit, ToggleLeft } from 'lucide-react'
import React, { useEffect } from 'react'

type Property = {
    id: string
    categoryId: string
    index: number
    type: string
    defaultId: string | null
    createdAt: Date
    updatedAt: Date
    name: string
    propertyOptions: propertyOptions[]
}

type Props = {
    property: Property | any
}

const PreviewBoolean = (props: Props) => {
    if (props.property.type !== 'boolean') return null
    const property: Property = props.property
    const [value, setValue] = React.useState<boolean>(false)
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (property.type === "text" || property.type === "number") {
            if (property.propertyOptions.length === 0) return
            const defaultValue = property.propertyOptions[0].value
            if (defaultValue) {
                setValue(defaultValue === 'true' ? true : false)
            }
        }
    }, [])


    return (
        isMounted && <div>
            <div className='flex gap-1 items-center mb-1 text-site-mainText'>
                <div>
                    {
                        property.type === 'boolean' && <ToggleLeft size={13} />
                    }

                </div>
                <div className='font-semibold '>
                    {formalizeText(props.property.name)}
                </div>
            </div>
            <div className='relative'>
                <div onClick={() => setValue(!value)} className={`h-8 w-full flex items-center pl-2 bg-white text-green-800 border rounded border-zinc-300/65 ${value && "bg-gradient-to-b from-amber-100 to-amber-200"}`}>
                    {formalizeText(value ? 'Yes' : 'No')}
                </div>
            </div>
        </div>
    )
}

export default PreviewBoolean
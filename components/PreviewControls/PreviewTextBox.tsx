'use client'
import { propertyOptions } from '@prisma/client'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { formalizeText } from '@/lib/my'

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

const PreviewTextBox = (props: Props) => {
    if (props.property.type !== 'text') return null
    const Ref: any = useRef(null)
    const property: Property = props.property
    const [value, setValue] = React.useState<string | number>()
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (property.type === "text" || property.type === "number") {
            if (property.propertyOptions.length === 0) return
            const defaultValue = property.propertyOptions[0].value
            if (defaultValue) {
                setValue(formalizeText(defaultValue))
            }
        }
    }, [])

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(formalizeText(e.target.value))
    }

    const handleFocus = () => {
        if (Ref.current) {
            Ref.current.select()
        }
    }


    return (
        isMounted && <div>
            <div className='font-semibold text-site-mainText'>
                {props.property.name}
            </div>
            <div>
                <Input onFocus={handleFocus} ref={Ref} type={String(property.type).toLocaleLowerCase()} value={value} onChange={handleValueChange} />
            </div>
        </div>
    )
}

export default PreviewTextBox
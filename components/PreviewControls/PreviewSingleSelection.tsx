'use client'
import { propertyOptions } from '@prisma/client'
import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { formalizeText } from '@/lib/my'
import Option from './SingleSelection/Option'

type Property = {
    id: string
    categoryId: string
    index: number
    type: string
    defaultId: string | null
    default: propertyOptions | null
    createdAt: Date
    updatedAt: Date
    name: string
    propertyOptions: propertyOptions[]
}

type Props = {
    property: Property | any
}

const PreviewSingleSelection = (props: Props) => {
    if (props.property.type !== 'single selection') return null
    const property: Property = props.property
    const [value, setValue] = React.useState<string | number>()
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (property.type === "single selection" || property.type === "single selection") {
            if (property.propertyOptions.length === 0) return
            if (!property.default) return
            const defaultValue = property.default.value
            if (defaultValue) {
                setValue(formalizeText(defaultValue))
            }
        }
    }, [])

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(formalizeText(e.target.value))
    }


    return (
        isMounted && <div>
            <div className='font-semibold text-site-mainText'>
                {props.property.name}
            </div>
            <div className='flex gap-1'>
                {
                    property.propertyOptions.map((option: propertyOptions) => {

                        return (
                            <div key={option.id}>
                                <Option option={option} selected={value} setSelected={setValue} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PreviewSingleSelection
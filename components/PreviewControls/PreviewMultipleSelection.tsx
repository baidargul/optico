'use client'
import { propertyOptions } from '@prisma/client'
import React, { useEffect } from 'react'
import { formalizeText } from '@/lib/my'
import Option from './MultipleSelection/Option'

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

const PreviewMultipleSelection = (props: Props) => {
    if (props.property.type !== 'multiple selection') return null
    const property: Property = props.property
    const [selectedValues, setSelectedValues] = React.useState<any>([])
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (property.type === "multiple selection") {
            if (property.propertyOptions.length === 0) return
            if (!property.default) return
            const defaultValue = property.default.value
            if (defaultValue) {
                const container = selectedValues
                if (container.includes(defaultValue)) return
                container.push(formalizeText(defaultValue))
            }
        }
    }, [])


    return (
        isMounted && <div>
            <div className='font-semibold text-site-mainText'>
                {props.property.name}
            </div>
            <div className='grid grid-cols-3 gap-1'>
                {
                    property.propertyOptions.map((option: propertyOptions) => {

                        return (
                            <div key={option.id}>
                                <Option option={option} selected={selectedValues} setSelected={setSelectedValues} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PreviewMultipleSelection
'use client'
import { propertyOptions } from '@prisma/client'
import React, { useEffect } from 'react'
import { formalizeText } from '@/lib/my'
import Option from './MultipleSelection/Option'
import { CheckCircle2, CircleDot, SquareStack } from 'lucide-react'

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
    values?: []
    setValues?: any
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

    const reflectChange = (value: any) => {
        if (props.setValues && props.values) {
            const newValues: any = props.values.filter((item: any) => item.propertyId !== property.id)
            let i = 0
            for (const item of selectedValues) {
                i++
                const data: any = {
                    propertyId: property.id,
                    index: i,
                    value: String(item),
                }
                newValues.push(data)
            }
            props.setValues(newValues)
        }
    }

    useEffect(() => {
        reflectChange(selectedValues)
    }, [selectedValues])


    return (
        isMounted && <div>
            <div className='flex gap-1 items-center mb-1 text-site-mainText'>
                <div>
                    {
                        <SquareStack size={13} />
                    }

                </div>
                <div className='font-semibold '>
                    {props.property.name}
                </div>
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
'use client'
import { propertyOptions } from '@prisma/client'
import React, { useEffect } from 'react'
import { formalizeText } from '@/lib/my'
import Option from './SingleSelection/Option'
import { CircleDot } from 'lucide-react'

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

const PreviewSingleSelection = (props: Props) => {
    if (props.property.type !== 'single selection') return null
    const property: Property = props.property
    const [value, setValue] = React.useState<string | number>()
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (property.type === "single selection") {
            if (property.propertyOptions.length === 0) return
            if (!property.default) return
            const defaultValue = property.default.value
            if (defaultValue) {
                setValue(formalizeText(defaultValue))
            }
        }
    }, [])

    function reflectChange(value: any) {
        if (props.setValues && props.values) {
            if (!value) {
                const newValues: any = props.values.filter((item: any) => item.propertyId !== property.id)
                props.setValues(newValues)
                return
            }
            const newValues: any = props.values.filter((item: any) => item.propertyId !== property.id)
            const data: any = {
                propertyId: property.id,
                index: 1,
                value: String(value),
            }
            newValues.push(data)
            props.setValues(newValues)
        }
    }

    useEffect(() => {
        if (props.setValues && props.values) {
            reflectChange(value)
        }
    }, [value])

    return (
        isMounted && <div className='group'>
            <div className='flex gap-1 items-center mb-1 text-site-mainText'>
                <div>
                    {
                        <CircleDot size={13} className='group-hover:scale-125 group-hover:fill-yellow-100/30 transition-all duration-500' />
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
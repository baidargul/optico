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
    values?: [] | any
    setValues?: any
}

const PreviewMultipleSelection = (props: Props) => {
    if (props.property.type !== 'multiple selection') return null
    const property: Property = props.property
    const [selectedValues, setSelectedValues] = React.useState<string | any>([])
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (property.type === "multiple selection") {
            if (property.propertyOptions.length === 0) return
            if (!property.default) return
            const defaultValue = String(property.default.value).toLocaleLowerCase()
            if (defaultValue) {
                const container = selectedValues
                if (container.includes(defaultValue)) return
                container.push(defaultValue)
                setSelectedValues(container)
            }
            reflectChange()
        }
    }, [])

    const reflectChange = (value?: any) => {
        if (props.setValues && props.values) {
            for (let item of selectedValues) {
                let isExists = false
                for (let target of props.values) {
                    if (String(item) === String(target.value).toLocaleLowerCase()) {
                        isExists = true
                        break;
                    }
                }
                if (!isExists) {
                    const data = {
                        propertyId: property.id,
                        index: props.values.length + 1,
                        value: String(item).toLocaleLowerCase()
                    }
                    props.setValues((prev: any) => {
                        return [...prev, data]
                    })
                }
            }

        }
    }

    useEffect(() => {
        reflectChange(selectedValues)
    }, [selectedValues])


    return (
        isMounted && <div className='group'>
            <div className='flex gap-1 items-center mb-1 text-site-mainText '>
                <div>
                    {
                        <SquareStack size={13} className='group-hover:rotate-45 transition-all duration-500' />
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
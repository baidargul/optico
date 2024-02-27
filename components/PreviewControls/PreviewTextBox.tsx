'use client'
import { propertyOptions } from '@prisma/client'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { formalizeText } from '@/lib/my'
import { FileCode, FileDigit, TextCursor } from 'lucide-react'

type Property = {
    id: string
    categoryId: string
    index: number
    type: string
    defaultId: string | null
    createdAt: Date
    updatedAt: Date
    name: string
    prefix: string | null
    suffix: string | null
    propertyOptions: propertyOptions[]
}

type Props = {
    property: Property | any
    values?: [] | any
    setValues?: any
}

const PreviewTextBox = (props: Props) => {
    if (props.property.type !== 'text' && props.property.type !== 'number') return null
    const Ref: any = useRef(null)
    const property: Property = props.property
    const [value, setValue] = React.useState<string | number>()
    const [isMounted, setIsMounted] = React.useState(false)

    function reflectChange(value: any) {
        const newValues = props.values.filter((item: any) => item.propertyId !== property.id)
        const data = {
            propertyId: property.id,
            index: 1,
            value: String(value).toLocaleLowerCase(),
        }
        newValues.push(data)
        props.setValues(newValues)
    }

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
        if (props.setValues && props.values) {
            reflectChange(e.target.value)
        }
    }

    const handleFocus = () => {
        if (Ref.current) {
            Ref.current.select()
        }
    }

    let previewValue: string | number | null = value ? property.prefix ? property.prefix + value : value : null
    previewValue = previewValue ? property.suffix ? previewValue + property.suffix : previewValue : null
    return (
        isMounted && <div className='group'>
            <div className='flex gap-1 items-center mb-1 text-site-mainText'>
                <div>
                    {
                        property.type === 'text' ? <TextCursor size={13} className='group-hover:rotate-180 transition-all duration-500' /> : <FileDigit size={13} className='group-hover:scale-125 transition-all duration-500' />
                    }

                </div>
                <div className='flex gap-1 items-center'>
                    <div className='font-semibold '>
                        {props.property.name}
                    </div>
                    {value && <div className='text-xs'>
                        ({
                            previewValue
                        })
                    </div>}
                </div>
            </div>
            <div>
                <Input onFocus={handleFocus} ref={Ref} type={String(property.type).toLocaleLowerCase()} value={value} onChange={handleValueChange} />
            </div>
        </div>
    )
}

export default PreviewTextBox
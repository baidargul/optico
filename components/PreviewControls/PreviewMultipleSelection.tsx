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
            // if (defaultValue) {
            //     const container = selectedValues
            //     if (container.includes(defaultValue)) return
            //     container.push(defaultValue)
            //     setSelectedValues(container)
            //     const data = {
            //         propertyId: property.id,
            //         index: 1,
            //         value: defaultValue
            //     }

            //     if (props.setValues && props.values) {
            //         const updatedValues = [...props.values, data]
            //         props.setValues(updatedValues)
            //     }

            // }
        }
    }, [])

    const reflectChange = (input?: any[]) => {
        if (props.setValues && props.values) {
            // Create a map to store the updated values, keyed by propertyId
            const updatedValuesMap = new Map();

            // Add existing values to the map
            props.values.forEach((item: any) => {
                if (!updatedValuesMap.has(item.propertyId)) {
                    updatedValuesMap.set(item.propertyId, []);
                }
                updatedValuesMap.get(item.propertyId).push(item);
            });

            // Update the map with values from selectedValues for the current property
            const currentPropertyValues = selectedValues.map((value: any, index: any) => {
                return { propertyId: property.id, index: index + 1, value: value };
            });

            updatedValuesMap.set(property.id, currentPropertyValues);

            // Convert the map back to an array of values
            const updatedValues: any = [];
            updatedValuesMap.forEach((values) => {
                values.forEach((newValue: any) => {
                    updatedValues.push(newValue);
                });
            });

            // Update setValues with the updated array
            props.setValues(updatedValues);
        }
    };
    useEffect(() => {
        reflectChange(selectedValues);
    }, [selectedValues]);



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
                                <Option option={option} selected={selectedValues} setSelected={setSelectedValues} property={property} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PreviewMultipleSelection
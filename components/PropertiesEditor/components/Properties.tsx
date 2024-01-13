'use client'
import React, { useState } from 'react'
import Property from './Properties/Property'

type Props = {
    category: any
}

const Properties = (props: Props) => {
    const [category, setCategory] = useState(props.category)



    return (
        <div className='grid grid-cols-3 gap-2'>
            {
                category.properties.map((property: any) => {
                    return (
                        <Property key={property.id} property={property} />
                    )
                })
            }
        </div>
    )
}

export default Properties
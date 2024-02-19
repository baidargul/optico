'use client'
import SelectProviderAdvance from '@/components/Select/SelectProviderAdvance'
import React, { useState } from 'react'

type Props = {}

const ControlBox = (props: Props) => {
    const [selectedProduct, setSelectedProduct] = useState({} as any)
    return (
        <div className='p-1'>
            <div>
                <SelectProviderAdvance setValue={setSelectedProduct}>
                    <div>
                        {selectedProduct.name ? selectedProduct.name : "Select Product"}
                    </div>
                </SelectProviderAdvance>
            </div>
        </div>
    )
}

export default ControlBox
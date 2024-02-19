'use client'
import ProductController from '@/components/App/Product/ProductController'
import SelectProviderAdvance from '@/components/Select/SelectProviderAdvance'
import React, { useEffect, useState } from 'react'

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
            <div>
                {selectedProduct && <ProductController id={selectedProduct.id} />}
            </div>
        </div>
    )
}

export default ControlBox
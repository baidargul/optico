'use client'
import ProductController from '@/components/App/Product/ProductController'
import SelectProviderAdvance from '@/components/Select/SelectProviderAdvance'
import React, { useEffect, useState } from 'react'
import CategorySelect from './Select/CategorySelect'
import { formalizeText } from '@/lib/my'

type Props = {}

const ControlBox = (props: Props) => {
    const [selectedProduct, setSelectedProduct] = useState({} as any)
    const [selectedCategory, setSelectedCategory] = useState({} as any)

    return (
        <div className='p-1 flex gap-2 items-center'>
            <div>
                <CategorySelect setValue={setSelectedCategory}>
                    <div>
                        {selectedCategory.name ? formalizeText(selectedCategory.name) : "Select Category"}
                    </div>
                </CategorySelect>
            </div>
            <div>
                <SelectProviderAdvance setValue={setSelectedProduct}>
                    <div>
                        {selectedProduct.name ? formalizeText(selectedProduct.name) : "Select Product"}
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
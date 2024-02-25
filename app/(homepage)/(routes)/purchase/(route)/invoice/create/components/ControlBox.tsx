'use client'
import ProductController from '@/components/App/Product/ProductController'
import React, { useEffect, useState } from 'react'
import CategorySelect from './Select/CategorySelect'
import { formalizeText } from '@/lib/my'
import SelectProductProvider from '@/app/(homepage)/(routes)/purchase/(route)/invoice/create/components/Select/SelectProductProvider'

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
                <SelectProductProvider setValue={setSelectedProduct} categoryId={selectedCategory.id ? selectedCategory.id : null}>
                    <div>
                        {selectedProduct.name ? formalizeText(selectedProduct.name) : "Select Product"}
                    </div>
                </SelectProductProvider>
            </div>
            <div>
                {selectedProduct && <ProductController id={selectedProduct.id} />}
            </div>
        </div>
    )
}

export default ControlBox
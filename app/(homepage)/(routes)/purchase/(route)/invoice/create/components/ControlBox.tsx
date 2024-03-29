'use client'
import ProductController from '@/components/App/Product/ProductController'
import React, { useEffect, useState } from 'react'
import CategorySelect from './Select/CategorySelect'
import { formalizeText } from '@/lib/my'
import SelectProductProvider from '@/app/(homepage)/(routes)/purchase/(route)/invoice/create/components/Select/SelectProductProvider'

type Props = {
    productHandler?: any
}

const ControlBox = (props: Props) => {
    const [selectedProduct, setSelectedProduct] = useState({} as any)
    const [selectedCategory, setSelectedCategory] = useState({} as any)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const handleCategoryChange = (category: any) => {
        setSelectedCategory(category)
        setSelectedProduct({})
    }

    return (
        isMounted && <div className='p-1'>
            <div className='p-1 flex gap-2 items-center'>
                <div>
                    <CategorySelect setValue={handleCategoryChange}>
                        <button className='bg-gradient-to-b from-slate-50 to-slate-200 p-1 rounded border border-slate-200'>
                            {selectedCategory.name ? formalizeText(selectedCategory.name) : "Select category"}
                        </button>
                    </CategorySelect>
                </div>
                <div>
                    {
                        selectedCategory.id && <SelectProductProvider setValue={setSelectedProduct} categoryId={selectedCategory.id ? selectedCategory.id : null}>
                            <button className='bg-gradient-to-b from-slate-50 to-slate-200 p-1 rounded border border-slate-200'>
                                {selectedProduct.name ? formalizeText(selectedProduct.name) : "Select product"}
                            </button>
                        </SelectProductProvider>
                    }
                </div>
            </div>
            {
                selectedCategory.id && selectedProduct.id &&
                <div className=''>
                    {<ProductController id={selectedProduct.id} productHandler={props.productHandler} />}
                </div>
            }

        </div >
    )
}

export default ControlBox
'use client'
import PreviewBoolean from '@/components/PreviewControls/PreviewBoolean'
import PreviewMultipleSelection from '@/components/PreviewControls/PreviewMultipleSelection'
import PreviewSingleSelection from '@/components/PreviewControls/PreviewSingleSelection'
import PreviewTextBox from '@/components/PreviewControls/PreviewTextBox'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    id: string
    productHandler?: any
}

const ProductController = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false)
    const [id, setId] = React.useState(props.id)
    const [product, setProduct] = React.useState({} as any)

    const fetchProduct = async () => {
        const data = {
            id: id
        }

        try {
            await axios.post('/api/definitions/item/find/', data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    setProduct(response.data)
                }
                else if (response.status === 299) {
                    //Skip this
                }
                else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error)
        }

    }

    useEffect(() => {
        // console.log(product)
    }, [product])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setId(props.id)
        fetchProduct()
    }, [props.id])


    return (
        isMounted && <div>
            <div className=''>
                {
                    product.category?.properties.length > 0 && (
                        <div className='p-2 grid grid-cols-3 gap-2 bg-slate-200/45 border border-slate-300 rounded'>
                            {product.category?.properties.map((property: any) => {

                                return (
                                    <div key={property.id} className='border p-2 border-slate-400/50 rounded-md border-b-2 hover:bg-slate-200/90 bg-slate-100 hover:drop-shadow-md transition-all'>
                                        <PreviewTextBox property={property} values={props.productHandler.products} setValues={props.productHandler.setProducts} />
                                        <PreviewBoolean property={property} values={props.productHandler.products} setValues={props.productHandler.setProducts}/>
                                        <PreviewMultipleSelection property={property} values={props.productHandler.products} setValues={props.productHandler.setProducts}/>
                                        <PreviewSingleSelection property={property} values={props.productHandler.products} setValues={props.productHandler.setProducts}/>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductController
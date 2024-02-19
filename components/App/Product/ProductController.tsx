'use client'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    id: string
}

const ProductController = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false)
    const [id, setId] = React.useState(null as any)

    const fetchProduct = async () => {
        const data = {
            id: props.id
        }

        try {
            await axios.post('/api/definitions/item/find/', data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    toast.success(response.message)
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
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setId(props.id)
        fetchProduct()
    }, [props.id])




    return (
        isMounted && <div>
            {props.id}
        </div>
    )
}

export default ProductController
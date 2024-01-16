'use client'
import React, { useState } from 'react'
import Property from './Properties/Property'
import { toast } from 'sonner'
import { Loader, Plus } from 'lucide-react'
import axios from 'axios'
import PropertyRightClick from '@/components/RightClickContextMenus/PropertyRightClick'
import { properties } from '@prisma/client'

type Props = {
    category: any
}

const Properties = (props: Props) => {
    const [isAddingProperty, setIsAddingProperty] = useState(false)
    const [category, setCategory] = useState(props.category)


    const handleAddPropertyClick = async () => {
        try {
            setIsAddingProperty(true)

            const data = {
                id: category.id,
            }

            await axios.post(`/api/definitions/category/do/property/create`, data).then(async (res) => {
                const response = await res.data
                if (response.status === 200) {
                    setCategory(response.data)
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
        setIsAddingProperty(false)
    }

    const refetchCategory = async () => {
        try {
            const data = {
                id: category.id
            }

            await axios.post(`/api/definitions/category/find/`, data).then(async (res) => {
                const response = await res.data
                if (response.status === 200) {
                    setCategory(response.data)
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }



    return (
        <div className='grid grid-cols-3 gap-2'>
            {
                category.properties.map((property: properties) => {
                    return (
                        <PropertyRightClick key={property.id} categoryId={property.categoryId} propertyId={property.id} refetchCategory={refetchCategory} >
                            <Property property={property} refetchCategory={refetchCategory} />
                        </PropertyRightClick>
                    )
                })
            }
            <button onClick={handleAddPropertyClick} className=' mt-auto mb-auto flex gap-1 h-fit  items-center bg-site-colors-primary/45 border border-site-colors-primary hover:bg-site-colors-secondary/45 active:bg-yellow-500/45  rounded-md w-fit p-2'>
                <div>
                    {!isAddingProperty && <Plus className='w-4 h-4' />}
                    {isAddingProperty && <Loader className='w-4 h-4 animate-spin' />}
                </div>
            </button>
        </div>
    )
}

export default Properties
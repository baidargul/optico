'use client'
import { ComboBoxProvider } from '@/components/ComboBox/ComboBoxProvider'
import React, { useEffect, useState } from 'react'
import { formalizeText } from '@/lib/my'
import axios from 'axios'
import { toast } from 'sonner'

type Props = {}

const Product = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false)
    const [categories, setCategories] = useState<any>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [selectedNature, setSelectedNature] = useState<any>(null)


    useEffect(() => {

        const fetchCategories = async () => {
            await axios.get('/api/definitions/category/find/findall/').then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    if (response.data) {
                        response.data.map((category: any) => {
                            setCategories((prev: any) => [...prev, { label: formalizeText(category.name), value: category.id, nature: category.nature.name }])
                        })
                    }
                } else {
                    toast.warning(response.message)
                }
            })
        }

        fetchCategories()
        setIsMounted(true)
    }, [])

    const handleSelectValue = (value: any) => {
        setSelectedCategory(value.label)
        for (const item of categories) {
            if (item.value === value.value) {
                setSelectedNature(item.nature)
            }
        }
    }

    return (
        isMounted && <div>
            <div>
                <div>
                    {categories?.length > 0 && <ComboBoxProvider align='start' content={categories} returnValue setValue={handleSelectValue}>
                        <div className='flex gap-1 items-center text-sm'>
                            <div className='p-1 bg-zinc-100 w-fit rounded font-semibold text-site-mainText'>
                                Category:
                            </div>
                            <div className=''>
                                {selectedCategory ? selectedCategory.label ? selectedCategory.label : selectedCategory : "Select a category"}.
                            </div>
                            {selectedCategory && <div className='flex gap-1 items-center'>
                                <div className='p-1 bg-zinc-100 w-fit rounded font-semibold text-site-mainText'>
                                    Nature:
                                </div>
                                <div>
                                    {formalizeText(selectedNature)}
                                </div>
                            </div>}
                        </div>
                    </ComboBoxProvider>}
                </div>
            </div>
        </div>
    )
}

export default Product
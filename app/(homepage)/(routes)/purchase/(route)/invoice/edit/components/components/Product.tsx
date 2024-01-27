'use client'
import { ComboBoxProvider } from '@/components/ComboBox/ComboBoxProvider'
import React, { useEffect, useState } from 'react'
import { formalizeText } from '@/lib/my'
import axios from 'axios'
import { toast } from 'sonner'
import { SelectControl } from '@/components/Select/SelectProvider'
import Dynamic from './Product/Dynamic'

type Props = {}

const Product = (props: Props) => {
    const [isMounted, setIsMounted] = useState(false)
    const [categories, setCategories] = useState<any>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [selectedNature, setSelectedNature] = useState<any>(null)
    const [categoryId, setCategoryId] = useState<any>(null)


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

    const handleSelectValue = async (value: any) => {
        setSelectedCategory(value.label)
        let data;
        for (const item of categories) {
            if (item.value === value.value) {
                data = {
                    id: value.value
                }
                setCategoryId(value.value)
            }
        }

        if (!data) {
            toast.message(`No valid id`)
        }

        try {
            await axios.post(`/api/definitions/category/find/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    if (response.data) {
                        setSelectedNature(response.data.nature)
                    }
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }

    }

    return (
        isMounted && <div>
            <div>
                <div>
                    {categories?.length > 0 && <ComboBoxProvider align='start' content={categories} returnValue setValue={handleSelectValue}>
                        <div className='flex gap-1 items-center text-sm'>
                            <div className='p-1  w-fit rounded font-semibold text-site-mainText'>
                                Category:
                            </div>
                            <div className=''>
                                {selectedCategory ? selectedCategory.label ? selectedCategory.label : selectedCategory : "Select a category."}
                            </div>
                            {selectedCategory && <div className='flex gap-1 items-center'>
                                <div className=''>
                                    as
                                </div>
                                {selectedNature && <div className={`p-1 bg-zinc-50 w-fit rounded border border-site-mainText/10 text-site-mainText ${selectedNature.dynamic && "first-letter:font-semibold"}`}>
                                    {formalizeText(selectedNature.name)}
                                </div>}
                            </div>}
                        </div>
                    </ComboBoxProvider>}
                </div>
                <div className='p-1'>
                    {
                        selectedNature && selectedNature.dynamic && <div>
                            <Dynamic id={categoryId}/>
                        </div>
                    }

                    {
                        selectedNature && !selectedNature.dynamic && <div>
                            <div>
                                {/* <SelectControl /> */}
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Product
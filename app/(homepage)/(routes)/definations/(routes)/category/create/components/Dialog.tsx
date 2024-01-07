'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import ListOfAvailableCategories from './Dialog/ListOfAvailableCategories'
import CategoryForm from './Dialog/CategoryForm'

type Props = {}

const Dialog = (props: Props) => {
    const [availableCategories, setAvailableCategories] = useState<any>()


    async function fetchCategories() {
        try {
            await axios.get(`/api/definitions/category/find/findall`).then(async (res) => {
                const data = await res.data;
                if (data.status === 200) {
                    setAvailableCategories(data.data)
                } else {
                    setAvailableCategories([])
                }
            });
        } catch (error: any) {
            toast.warning(error.message)
            setAvailableCategories([])
        }
    };


    useEffect(() => {
        const executeAsync = async () => {
            await fetchCategories();
        }
        executeAsync()
    }, []);

    return (
        <div>
            <div className='text-2xl text-site-mainText font-semibold mb-5 flex gap-1 items-center'>
                <div>
                    Category definitions
                </div>
            </div>
            <div className='flex gap-2 justify-between'>
                <div className='bg-white p-2 w-[30%] rounded border border-slate-200/50 drop-shadow-sm'>
                    <ListOfAvailableCategories categories={availableCategories} fetch={fetchCategories} />
                </div>
                <div className='bg-white p-2 w-[70%] h-fit rounded border border-slate-200/50 drop-shadow-sm'>
                    <CategoryForm fetch={fetchCategories} />
                </div>
            </div>
        </div>
    )
}

export default Dialog
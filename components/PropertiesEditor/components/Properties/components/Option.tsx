import HiddenInput from '@/components/HiddenInput/HiddenInput'
import { formalizeText } from '@/lib/my'
import { propertyOptions } from '@prisma/client'
import axios from 'axios'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    option: propertyOptions
    fetchPrevValue: any
}

const Option = (props: Props) => {
    const option = props.option
    const handleOptionRemove = async () => {
        try {

            const data = {
                id: option.id
            }

            await axios.post(`/api/definitions/category/do/property/options/single-selection/delete/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await props.fetchPrevValue()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }



    return (
        <div className='p-1 pl-2 bg-site-background hover:bg-white rounded text-site-mainText/70 border font-semibold font-sans flex gap-1 justify-between'>
            <div>
                {
                    formalizeText(option.value ? option.value : '-')
                }
            </div>
            <div>
                <div className='flex'>
                    <div>
                        <ArrowUp onClick={async () => { }} className='hover:bg-site-colors-secondary bg-zinc-400 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md' />
                    </div>
                    <div>
                        <ArrowDown onClick={async () => { }} className='hover:bg-site-colors-secondary bg-zinc-400 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md' />
                    </div>
                    <div onClick={handleOptionRemove} className=' hover:bg-site-colors-secondary bg-zinc-400 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md'>
                        x
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Option
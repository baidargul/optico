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
    setDefault: any
    default: boolean
}

const Option = (props: Props) => {
    const option = props.option
    const handleOptionRemove = async () => {
        try {

            const data = {
                id: option.id
            }

            await axios.post(`/api/definitions/category/do/property/options/multi-selection/delete/`, data).then(async (res: any) => {
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

    const handleOptionDefaultClick = async () => {
        try {

            const data = {
                id: option.id
            }
            await axios.patch(`/api/definitions/category/do/property/options/multi-selection/select-default/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await props.fetchPrevValue()
                    if (props.default) {
                        props.setDefault(null)
                    } else {
                        props.setDefault(option.id)
                    }
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleIndexChange = async (index: number) => {
        try {

            const data = {
                id: option.id,
                index: index
            }
            await axios.patch(`/api/definitions/category/do/property/options/multi-selection/index/`, data).then(async (res: any) => {
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
        <div onDoubleClick={handleOptionDefaultClick} className={`p-1 pl-2 ${props.default ? "bg-site-colors-primary/20  transition-all duration-200 " : "bg-site-background hover:bg-white"}  rounded text-site-mainText/70 border font-semibold font-sans flex gap-1 justify-between`}>
            <div className='w-full'>
                {
                    formalizeText(option.value ? option.value : '-')
                }
            </div>
            <div>
                <div className='flex'>
                    <div>
                        <ArrowUp onClick={async () => handleIndexChange(-1)} className='hover:bg-site-colors-secondary bg-zinc-400 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md' />
                    </div>
                    <div>
                        <ArrowDown onClick={async () => handleIndexChange(1)} className='hover:bg-site-colors-secondary bg-zinc-400 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md' />
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
'use client'
import HiddenInput from '@/components/HiddenInput/HiddenInput'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

type Props = {
    id: string // Category Property Id
}

const Property = (props: Props) => {
    const [propertyName, setPropertyName] = useState("New Property")

    const handleDeletePropertyClick = async () => {

    }

    return (
        <div className='relative w-full p-1 text-sm bg-gradient-to-r from-zinc-50 to-zinc-50 h-20 rounded border border-zinc-200/80'>
            <div onClick={handleDeletePropertyClick} className='absolute right-0 hover:bg-site-colors-secondary bg-site-colors-secondary/40 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md'>
                x
            </div>
            <div>
                <HiddenInput onSubmit={() => { }} value={propertyName} setValue={setPropertyName}>
                    <div className='font-semibold text-site-mainText font-sans'>
                        {propertyName}
                    </div>
                </HiddenInput>
            </div>
            <Separator className='my-2 opacity-40'/>
        </div>
    )
}

export default Property
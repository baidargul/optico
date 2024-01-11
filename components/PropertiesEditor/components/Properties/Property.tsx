'use client'
import HiddenInput from '@/components/HiddenInput/HiddenInput'
import { Select } from '@/components/Select/SelectProvider'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, Circle, MoveLeft, MoveRight } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    id: string // Category Property Id
}

const Property = (props: Props) => {
    const [propertyName, setPropertyName] = useState("New Property")
    const [propertyType, setPropertyType] = useState("text")

    const values = ["single selection", "multiple selection", "text", "number", "boolean"].sort(
        (a, b) => a.localeCompare(b)
    )



    const handleDeletePropertyClick = async () => {

    }

    const handleIndexChange = async (index: number) => {

    }

    return (
        <div className='relative w-full p-1 text-sm bg-gradient-to-r from-zinc-50 to-zinc-50 rounded border border-zinc-200/80'>
            <div className='absolute right-0 flex'>
                <div>
                    <ArrowLeft onClick={async () => await handleIndexChange(-1)} className='hover:bg-site-colors-secondary bg-site-colors-secondary/40 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md' />
                </div>
                <div>
                    <ArrowRight onClick={async () => await handleIndexChange(1)} className='hover:bg-site-colors-secondary bg-site-colors-secondary/40 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md' />
                </div>
                <div onClick={handleDeletePropertyClick} className=' hover:bg-site-colors-secondary bg-site-colors-secondary/40 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md'>
                    x
                </div>
            </div>
            <div>
                <HiddenInput onSubmit={() => { }} value={propertyName} setValue={setPropertyName} scale={75}>
                    <div className='font-semibold text-site-mainText font-sans flex items-center gap-1'>
                        <Circle className='w-2 h-2' />
                        {propertyName}
                    </div>
                </HiddenInput>
            </div>
            <Separator className='my-2 opacity-40' />
            <div className='flex gap-4 items-center'>
                <div className=''>
                    <Select placeholder='Type' label='Property type' values={values} onChange={(value: any) => setPropertyType(value)} defaultValue={propertyType} />
                </div>
                <div className='text-site-colors-secondary/70 text-xs'>
                    {
                        propertyDescription(propertyType)
                    }
                </div>
            </div>
            <Separator className='my-2 opacity-40' />
        </div>
    )
}

export default Property

function propertyDescription(type: string) {
    switch (type) {
        case "single selection":
            return "Select one option from a list of options"
        case "multiple selection":
            return "Select multiple options from a list of options"
        case "text":
            return "Get inputs inform of regular text."
        case "number":
            return "Get inputs inform of numbers."
        case "boolean":
            return "Get inputs inform of true or false."
        default:
            return "Get inputs inform of regular text."
    }
}
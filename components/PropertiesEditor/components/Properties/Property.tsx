'use client'
import HiddenInput from '@/components/HiddenInput/HiddenInput'
import { SelectControl } from '@/components/Select/SelectProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, Circle, MoveLeft, MoveRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Option from './components/Option'

type Props = {
    property: any
}

const Property = (props: Props) => {
    const [property, setProperty] = useState(props.property)
    const [propertyName, setPropertyName] = useState("New Property")
    const [propertyType, setPropertyType] = useState("text")

    useEffect(()=>{
        setProperty(props.property)
        setPropertyName(props.property.name)
        setPropertyType(props.property.type)
    },[props.property])

    const values = ["single selection", "multiple selection", "text", "number", "boolean"].sort(
        (a, b) => a.localeCompare(b)
    )



    const handleDeletePropertyClick = async () => {

    }

    const handleIndexChange = async (index: number) => {

    }

    const handlePropertyTypeChange = async (type: string) => {
        setPropertyType(type)
    }



    return (
        <div className='relative hover:drop-shadow-md hover:z-40 transition-all duration-500 w-full h-fit p-1 text-sm bg-gradient-to-r from-zinc-50 to-zinc-50 rounded border border-zinc-200/80'>
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
                    <SelectControl placeholder='Type' label='Property type' values={values} onChange={async (value: any) => await handlePropertyTypeChange(value)} defaultValue={propertyType} />
                </div>
                <div className='text-site-colors-secondary/70 text-xs'>
                    {
                        propertyDescription(propertyType)
                    }
                </div>
            </div>
            <Separator className='my-2 opacity-40' />
            <div>
                {
                    getControls(propertyType)
                }
            </div>
        </div>
    )
}

export default Property

function propertyDescription(type: string) {
    switch (type) {
        case "single selection":
            return "Select one option from a list of options."
        case "multiple selection":
            return "Select multiple options from a list of options."
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

function getControls(type: string) {

    switch (type) {
        case "single selection":
            return <SingleSelectionControl />
        case "multiple selection":
            break;
        case "text":
            return <TextControl />
        case "number":
            return <NumberControl />
        case "boolean":
            return <BooleanControl />
        default:
            return null
    }

}

function TextControl() {
    const [value, setValue] = useState("")
    return (
        <div className='text-sm'>
            <div>
                <div className='font-semibold text-site-mainText/80 text-xs'>
                    Default value:
                </div>
                <div className=''>
                    <div>
                        <Input placeholder='' value={value} onChange={(e: any) => { setValue(e.target.value) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
function NumberControl() {
    const [value, setValue] = useState()
    return (
        <div className='text-sm'>
            <div>
                <div className='font-semibold text-site-mainText/80 text-xs'>
                    Default value:
                </div>
                <div className=''>
                    <div>
                        <Input type='number' placeholder='' value={value} onChange={(e: any) => { setValue(e.target.value) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
function BooleanControl() {
    const [value, setValue] = useState(false)
    return (
        <div className='text-sm'>
            <div>
                <div className='font-semibold text-site-mainText/80 text-xs'>
                    Default value:
                </div>
                <div className=''>
                    <div onClick={() => setValue(!value)} className={`h-8 w-full border rounded-md pl-2 flex items-center transition-all ${value === true ? "bg-site-colors-primary/40 border-site-colors-primary" : ""}`}>
                        {value ? "Yes" : "No"}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SingleSelectionControl() {
    const [newValue, setNewValue] = useState("")
    const [options, setOptions] = useState([])
    return (
        <div className='text-sm'>
            <div>
                <div className='font-semibold text-site-mainText/80 text-xs w-full'>
                    New value:
                </div>
                <div className='flex justify-between gap-2'>
                    <div className='w-full'>
                        <Input type='text' placeholder='' value={newValue} onChange={(e: any) => { setNewValue(e.target.value) }} />
                    </div>
                    <div>
                        <Button className='h-8 text-site-mainText border' variant={'ghost'}>Insert</Button>
                    </div>
                </div>
            </div>
            <div className='mt-1'>
                <div className='font-semibold text-site-mainText/80 text-xs w-full'>
                    Values:
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <Option />
                    <Option />
                    <Option />
                    <Option />
                </div>
            </div>
        </div>
    )
}
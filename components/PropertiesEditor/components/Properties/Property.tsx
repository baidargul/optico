'use client'
import HiddenInput from '@/components/HiddenInput/HiddenInput'
import { SelectControl } from '@/components/Select/SelectProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, Circle, MoveLeft, MoveRight } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import Option from './components/Option'
import { toast } from 'sonner'
import axios from 'axios'
import { formalizeText } from '@/lib/my'

type Props = {
    property: any
    refetchCategory: any
}

const Property = (props: Props) => {
    const [property, setProperty] = useState(props.property)
    const [propertyName, setPropertyName] = useState("New Property")
    const [propertyType, setPropertyType] = useState("text")
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        setProperty(props.property)
        setPropertyName(props.property.name)
        setPropertyType(props.property.type)
    }, [props.property])

    const values = ["single selection", "multiple selection", "text", "number", "boolean"].sort(
        (a, b) => a.localeCompare(b)
    )



    const handleDeletePropertyClick = async () => {
        try {

            const data = {
                id: property.id,
            }

            setIsUpdating(true)
            await axios.post(`/api/definitions/category/do/property/delete`, data).then(async (res: any) => {
                const response: any = await res.data
                if (response.status === 200) {
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
        setIsUpdating(false)
    }

    const handleIndexChange = async (index: number) => {
        try {
            setIsUpdating(true)
            const data = {
                id: property.id,
                index: index
            }

            await axios.patch(`/api/definitions/category/do/property/index/`, data).then(async (res: any) => {
                const response: any = await res.data
                if (response.status === 200) {
                    setProperty(response.data)
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
        setIsUpdating(false)
    }

    const handlePropertyTypeChange = async (type: string) => {
        try {
            const data = {
                id: property.id,
                type: String(type).toLocaleLowerCase()
            }

            setIsUpdating(true)
            await axios.patch(`/api/definitions/category/do/property/changeType/`, data).then(async (res: any) => {
                const response: any = await res.data
                if (response.status === 200) {
                    setProperty(response.data)
                    setPropertyType(type)
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
        setIsUpdating(false)
    }

    const handlePropertyNameChange = async (newName: string) => {
        try {
            const data = {
                id: property.id,
                name: newName
            }

            setIsUpdating(true)
            await axios.patch(`/api/definitions/category/do/property/rename/`, data).then(async (res: any) => {
                const response: any = await res.data
                if (response.status === 200) {
                    setProperty(response.data)
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
        setIsUpdating(false)
    }



    return (
        <div className={`relative hover:drop-shadow-md hover:z-40 transition-all duration-500 w-full h-fit p-1 text-sm bg-gradient-to-r from-zinc-50 to-zinc-50 rounded border border-zinc-200/80 ${isUpdating && "animate-pulse cursor-not-allowed"}`}>
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
                <HiddenInput onSubmit={handlePropertyNameChange} value={propertyName} setValue={setPropertyName} scale={75}>
                    <div className='font-semibold text-site-mainText font-sans flex items-center gap-1'>
                        <Circle className='w-2 h-2' />
                        {propertyName}
                    </div>
                </HiddenInput>
            </div>
            <Separator className='my-2 opacity-40' />
            <div className='flex gap-4 items-center'>
                <div className=''>
                    <SelectControl placeholder='Type' label='Property type' values={values} onChange={async (value: any) => await handlePropertyTypeChange(value)} defaultValue={property.type} />
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
                    getControls(propertyType, property.id, setIsUpdating)
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

function getControls(type: string, propertyId: string, setIsUpdating: any) {

    switch (type) {
        case "single selection":
            return <SingleSelectionControl propertyId={propertyId} setIsUpdating={setIsUpdating} />
        case "multiple selection":
            break;
        case "text":
            return <TextControl propertyId={propertyId} setIsUpdating={setIsUpdating} />
        case "number":
            return <NumberControl propertyId={propertyId} setIsUpdating={setIsUpdating} />
        case "boolean":
            return <BooleanControl propertyId={propertyId} setIsUpdating={setIsUpdating} />
        default:
            return null
    }

}

type ControlProps = {
    propertyId: string
    setIsUpdating: any
}
function TextControl(props: ControlProps) {
    const [isFetching, setIsFetching] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [value, setValue] = useState("");

    const fetchPrevValue = async () => {
        props.setIsUpdating(true)
        try {
            const data = {
                id: props.propertyId
            }

            await axios.post(`/api/definitions/category/do/property/options/text/get/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    if (response.data) {
                        setValue(formalizeText(response.data))
                    } else {
                        setValue("")
                    }
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
        props.setIsUpdating(false)
    }

    useEffect(() => {
        fetchPrevValue()
        setIsMounted(true)
    }, [])

    useEffect(() => {
        let timeoutId: any;

        const doUpdate = async () => {
            if (!isMounted) {
                return
            }

            if (isFetching) {
                setIsFetching(false)
                return
            }

            props.setIsUpdating(true)

            try {

                const data = {
                    id: props.propertyId,
                    value: value
                }


                await axios.post(`/api/definitions/category/do/property/options/text/create/`, data).then(async (res: any) => {
                    const response = await res.data
                    if (response.status === 200) {
                        toast.success(response.message)
                    } else {
                        toast.warning(response.message)
                        await fetchPrevValue()
                    }
                })

            } catch (error: any) {
                toast.error(error.message)
                await fetchPrevValue()
            }
            props.setIsUpdating(false)
        };

        const handleChange = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                doUpdate();
            }, 1000);
        };

        handleChange();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value]);

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
    );
}


function NumberControl(props: ControlProps) {
    const [isFetching, setIsFetching] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [value, setValue] = useState<any>();

    const fetchPrevValue = async () => {
        props.setIsUpdating(true)
        try {
            const data = {
                id: props.propertyId
            }

            await axios.post(`/api/definitions/category/do/property/options/number/get/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    if (response.data) {
                        setValue(Number(response.data))
                    } else {
                        setValue(null)
                    }
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
        props.setIsUpdating(false)
    }

    useEffect(() => {
        setIsMounted(true)
        fetchPrevValue()
    }, [])

    useEffect(() => {
        let timeoutId: any;

        const doUpdate = async () => {
            if (!isMounted) {
                return
            }

            if (isFetching) {
                setIsFetching(false)
                return
            }

            props.setIsUpdating(true)
            try {

                const data = {
                    id: props.propertyId,
                    value: value
                }


                await axios.post(`/api/definitions/category/do/property/options/number/create/`, data).then(async (res: any) => {
                    const response = await res.data
                    if (response.status === 200) {
                        toast.success(response.message)
                    } else {
                        toast.warning(response.message)
                        await fetchPrevValue()
                    }
                })

            } catch (error: any) {
                toast.error(error.message)
                await fetchPrevValue()
            }
            props.setIsUpdating(false)
        };

        const handleChange = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                doUpdate();
            }, 1000);
        };

        handleChange();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value]);

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

function BooleanControl(props: ControlProps) {
    const [isFetching, setIsFetching] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [value, setValue] = useState<any>();

    useEffect(() => {
        setIsMounted(true)
        fetchPrevValue()
    }, [])

    const fetchPrevValue = async () => {
        props.setIsUpdating(true)
        try {
            const data = {
                id: props.propertyId
            }

            await axios.post(`/api/definitions/category/do/property/options/boolean/get/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    if (response.data) {
                        const data = String(response.data).toLocaleLowerCase() === "true" ? true : false
                        setValue(data)
                    } else {
                        setValue(false)
                    }
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
        props.setIsUpdating(false)
    }

    const handleValueChange = async () => {
        try {

            if (isFetching) {
                setIsFetching(false)
                return
            }

            const data = {
                id: props.propertyId,
                value: !value
            }

            props.setIsUpdating(true)

            await axios.post(`/api/definitions/category/do/property/options/boolean/create/`, data).then(async (res: any) => {
                const response: any = await res.data
                if (response.status === 200) {
                    setValue(!value)
                    toast.success(response.message)
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
        props.setIsUpdating(false)
    }

    return (
        <div className='text-sm'>
            <div>
                <div className='font-semibold text-site-mainText/80 text-xs'>
                    Default value:
                </div>
                <div className=''>
                    <div onClick={handleValueChange} className={`h-8 w-full border rounded-md pl-2 flex items-center transition-all ${value === true ? "bg-site-colors-primary/40 border-site-colors-primary" : ""}`}>
                        {value ? "Yes" : "No"}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SingleSelectionControl(props: ControlProps) {
    const [isFetching, setIsFetching] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [newValue, setNewValue] = useState("")
    const [options, setOptions] = useState([])

    useEffect(() => {
        setIsMounted(true)
        fetchPrevValue()
    }, [])

    const fetchPrevValue = async () => {
        props.setIsUpdating(true)
        try {
            const data = {
                id: props.propertyId
            }

            await axios.post(`/api/definitions/category/do/property/options/single-selection/get/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    if (response.data) {
                        setOptions(response.data)
                    } else {
                        setOptions([])
                    }
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
        props.setIsUpdating(false)
    }

    const handleAddPropertyOption = async () => {
        try {

            const data = {
                id: props.propertyId,
                value: newValue
            }

            await axios.post(`/api/definitions/category/do/property/options/single-selection/create`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await fetchPrevValue()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }

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
                        <Button onClick={handleAddPropertyOption} className='h-8 text-site-mainText border' variant={'ghost'}>Insert</Button>
                    </div>
                </div>
            </div>
            <div className='mt-1'>
                <div className='font-semibold text-site-mainText/80 text-xs w-full'>
                    Values:
                </div>
                <div className='w-full flex flex-col gap-1'>
                    {
                        options.map((option: any, index: number) => {
                            return (
                                <Option key={index} option={option} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
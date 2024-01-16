import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuLabel,
    ContextMenuSeparator
} from "@/components/ui/context-menu"
import { properties } from '@prisma/client'
import axios from 'axios'
import { toast } from 'sonner'
import { formalizeText } from '@/lib/my'
import { ArrowBigLeft, ArrowBigLeftDash, ArrowBigRight, ArrowBigRightDash, Trash } from 'lucide-react'

type Props = {
    children: React.ReactNode
    categoryId: string
    propertyId: string
    refetchCategory: any
}

const PropertyRightClick = (props: Props) => {
    const [property, setProperty] = React.useState<properties | null>(null)
    const [isMounted, setIsMounted] = React.useState(false)

    const fetchProperty = async () => {
        const data = {
            id: props.propertyId
        }
        try {
            await axios.post(`/api/definitions/category/do/property/find/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    setProperty(response.data)
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleInsertNext = async () => {
        try {

            const data = {
                categoryId: props.categoryId,
                targetId: props.propertyId
            }

            await axios.post(`/api/definitions/category/do/property/create/insert-after`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const handleInsertBefore = async () => {
        try {

            const data = {
                categoryId: props.categoryId,
                targetId: props.propertyId
            }

            await axios.post(`/api/definitions/category/do/property/create/insert-before`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const handleStepBack = async () => {
        try {

            const data = {
                id: props.propertyId,
                index: -1
            }

            await axios.patch(`/api/definitions/category/do/property/index/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const handleStepNext = async () => {
        try {

            const data = {
                id: props.propertyId,
                index: 1
            }

            await axios.patch(`/api/definitions/category/do/property/index/`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleDeleteProperty = async () => {
        try {

            const data = {
                id: props.propertyId,
            }

            await axios.post(`/api/definitions/category/do/property/delete`, data).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    await props.refetchCategory()
                } else {
                    toast.warning(response.message)
                }
            })

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    React.useEffect(() => {
        setIsMounted(true)
        fetchProperty()
    }, [])

    if (!property) {
        return (
            <div className='text-site-noFoundText'>
                Unknown property.
            </div>
        )
    }

    return (
        isMounted && <ContextMenu>
            <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
            <ContextMenuContent collisionPadding={10} className='select-none'>
                <ContextMenuLabel>
                    <div className='text-xs flex gap-1 items-center'>
                        <div>
                            Property:
                        </div>
                        <span className='font-normal p-1 bg-site-background rounded scale-75'>{formalizeText(property.name)}</span>
                    </div>
                </ContextMenuLabel>
                <ContextMenuLabel className='scale-75 text-site-noFoundText font-normal'>Move</ContextMenuLabel>
                <ContextMenuItem onClick={handleStepBack} className='flex gap-1'>
                    <div>
                        <ArrowBigLeft className='w-4 h-4' />
                    </div>
                    <div>
                        Step back
                    </div>
                </ContextMenuItem>
                <ContextMenuItem onClick={handleStepNext} className='flex gap-1'>
                    <div>
                        <ArrowBigRight className='w-4 h-4' />
                    </div>
                    <div>
                        Step next
                    </div>
                </ContextMenuItem>
                <ContextMenuLabel className='scale-75 text-site-noFoundText font-normal'>Create</ContextMenuLabel>
                <ContextMenuItem onClick={handleInsertBefore} className='flex gap-1'>
                    <div>
                        <ArrowBigLeftDash className='w-4 h-4' />
                    </div>
                    <div>
                        Insert before
                    </div>
                </ContextMenuItem>
                <ContextMenuItem onClick={handleInsertNext} className='flex gap-1'>
                    <div>
                        <ArrowBigRightDash className='w-4 h-4' />
                    </div>
                    <div>
                        Insert after
                    </div>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={handleDeleteProperty} className='flex gap-1 bg-red-100'>
                    <div>
                        <Trash className='w-3 h-3 ' />
                    </div>
                    <div>
                        Delete
                    </div>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default PropertyRightClick
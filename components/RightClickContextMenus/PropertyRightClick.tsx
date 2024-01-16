import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuLabel,
} from "@/components/ui/context-menu"
import { properties } from '@prisma/client'
import axios from 'axios'
import { toast } from 'sonner'
import { formalizeText } from '@/lib/my'

type Props = {
    children: React.ReactNode
    categoryId: string
    propertyId: string
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
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem>Subscription</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default PropertyRightClick
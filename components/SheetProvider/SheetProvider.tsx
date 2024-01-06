import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react'
import { DialogTrigger } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"

type Props = {
    title?: string
    trigger: React.ReactNode
    children: React.ReactNode
    side?: 'left' | 'right' | 'top' | 'bottom'
}

const SheetProvider = (props: Props) => {
    return (
        <Sheet>
            <SheetTrigger className="w-full">{props.trigger}</SheetTrigger>
            <SheetContent side={props.side ? props.side : 'right'}>
                <ScrollArea className="w-full h-[650px] p-2" type="always">
                    <SheetHeader>
                    </SheetHeader>
                    {
                        props.children
                    }
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export default SheetProvider
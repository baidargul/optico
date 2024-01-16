import { formalizeText } from "@/lib/my"
import prisma from "@/lib/prisma"
import React from 'react'
import Title from "./components/Title"
import { Separator } from "@/components/ui/separator"
import PropertyEditor from "@/components/PropertiesEditor/Editor"

type Props = {
    params: any
}

const page = async (props: Props) => {
    const id = props.params.id

    const category = await prisma.category.findUnique({
        include: {
            nature: true
        },
        where: {
            id: id
        }
    })

    if (!category) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="font-semibold text-sm">
                    Unknown or invalid category.
                </div>
            </div>
        )
    }

    return (
        <div className="p-1">
            <Title category={category} />
            <Separator className="my-4" />
            <div className="">
                <PropertyEditor id={category.id} />
            </div>
        </div>
    )
}

export default page
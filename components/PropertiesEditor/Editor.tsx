import prisma from "@/lib/prisma"
import React from 'react'
import Properties from "./components/Properties"

type Props = {
    id: string //id of Category
}

const PropertyEditor = async (props: Props) => {
    const id = props.id

    const category = await prisma.category.findUnique({
        include: {
            nature: true
        },
        where: {
            id: id
        }
    })
    
    if(!category){
        return null
    }

    return (
        <div>
            <Properties category={category}/>
        </div>
    )
}

export default PropertyEditor
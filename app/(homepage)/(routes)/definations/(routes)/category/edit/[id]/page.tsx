import prisma from "@/lib/prisma"
import React from 'react'

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

    return (
        <div>
            <div>
                {
                    category?.name
                }
            </div>
        </div>
    )
}

export default page
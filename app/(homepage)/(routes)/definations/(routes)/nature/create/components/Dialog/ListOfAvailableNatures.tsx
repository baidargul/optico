import prisma from "@/lib/prisma"
import React from 'react'

type Props = {}

const ListOfAvailableNatures = async (props: Props) => {

    const availableNatures = await prisma.nature.findMany({})

    console.log(availableNatures)

    if (!availableNatures || availableNatures.length < 1) {
        return <div className="text-site-noFoundText font-sans">No natures found.</div>
    }

    return (
        <div>ListOfAvailableNatures</div>
    )
}

export default ListOfAvailableNatures
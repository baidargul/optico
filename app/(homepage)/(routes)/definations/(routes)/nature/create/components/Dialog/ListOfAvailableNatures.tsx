import prisma from "@/lib/prisma"
import { nature } from "@prisma/client"
import React from 'react'
import Nature from "./ListOfAvailableNatures/Nature"

type Props = {}

const ListOfAvailableNatures = async (props: Props) => {

    const availableNatures = await prisma.nature.findMany({})

    console.log(availableNatures)

    if (!availableNatures || availableNatures.length < 1) {
        return <div className="text-site-noFoundText font-sans">No natures found.</div>
    }

    return (
        <div>
            {
                availableNatures && availableNatures.map((nature: nature) => {

                    return (
                        <div key={nature.id}>
                            <Nature nature={nature} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListOfAvailableNatures
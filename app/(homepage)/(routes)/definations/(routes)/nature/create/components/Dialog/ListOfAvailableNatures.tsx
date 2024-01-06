import prisma from "@/lib/prisma"
import { nature } from "@prisma/client"
import React from 'react'
import Nature from "./ListOfAvailableNatures/Nature"

type Props = {}

const ListOfAvailableNatures = async (props: Props) => {

    const availableNatures = await prisma.nature.findMany({})

    if (!availableNatures || availableNatures.length < 1) {
        return <div className="text-site-noFoundText font-sans">No natures found.</div>
    }

    return (
        <div className="">
            <div className="text-sm font-semibold text-site-mainText py-1 border-b border-dashed border-site-mainText/30 mb-2">
                Natures:
            </div>
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
        </div>
    )
}

export default ListOfAvailableNatures
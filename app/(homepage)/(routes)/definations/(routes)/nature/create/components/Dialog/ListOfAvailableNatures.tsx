'use client'
import { nature } from "@prisma/client"
import React, { useEffect, useState } from 'react'
import Nature from "./ListOfAvailableNatures/Nature"

type Props = {
    natures: any
    fetch: any
}

const ListOfAvailableNatures = (props: Props) => {
    const [availableNatures, setAvailableNatures] = useState<any>(props.natures)

    useEffect(() => {
        setAvailableNatures(props.natures)
    }, [props.natures])

    if (!availableNatures || availableNatures.length < 1) {
        return <div className="text-site-noFoundText font-sans">No natures found.</div>;
    }

    return (
        <div className="">
            <div className="text-sm font-semibold text-site-mainText py-1 border-b border-dashed border-site-mainText/30 mb-2">
                Natures:
            </div>
            <div>
                {
                    availableNatures && availableNatures.map((nature: nature) => (
                        <div key={nature.id}>
                            <Nature nature={nature} fetch={props.fetch}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ListOfAvailableNatures;

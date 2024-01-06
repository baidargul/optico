'use client'
import { nature } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ArchiveController from './Nature/ArchiveController'
import axios from 'axios'

type Props = {
    nature: nature
}

const Nature = (props: Props) => {
    const [nature, setNature] = useState(props.nature)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const data = {
    //             id: nature.id
    //         }
    //         axios.post(`/api/definitions/nature/find/`, data).then(async (res) => {
    //             const data = await res.data
    //             if (data.status === 200) {
    //                 setNature(data.data)
    //             } else {
    //                 console.log(data.message)
    //             }
    //         })
    //     }, 1000);


    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    return (
        nature && <div className='relative py-1 border-b hover:bg-zinc-100/50'>
            <div>
                <ArchiveController nature={nature} setNature={setNature} />
            </div>
            <div className=''>
                {nature.name}
            </div>
        </div>
    )
}

export default Nature
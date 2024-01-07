'use client'
import React, { useEffect, useState } from 'react'
import ListOfAvailableNatures from './Dialog/ListOfAvailableNatures'
import NaturesForm from './Dialog/NaturesForm'
import axios from 'axios'

type Props = {}

const Dialog = (props: Props) => {
    const [availableNatures, setAvailableNatures] = useState<any>()


    async function fetchNatures() {
        try {
            await axios.get(`/api/definitions/nature/find/findall`).then(async (res) => {
                const data = await res.data;
                if (data.status === 200) {
                    setAvailableNatures(data.data)
                } else {
                    setAvailableNatures([])
                }
            });
        } catch (error) {
            console.error("Error fetching natures:", error);
            setAvailableNatures([])
        }
    };


    useEffect(() => {
        const executeAsync = async () => {
            await fetchNatures();
        }
        executeAsync()
    }, []);

    return (
        <div>
            <div className='text-2xl text-site-mainText font-semibold mb-5 flex gap-1 items-center'>
                <div>
                    Nature definitions
                </div>
            </div>
            <div className='flex gap-2 justify-between'>
                <div className='bg-white p-2 w-[30%] rounded border border-slate-200/50 drop-shadow-sm'>
                    <ListOfAvailableNatures natures={availableNatures} fetch={fetchNatures} />
                </div>
                <div className='bg-white p-2 w-[70%] h-fit rounded border border-slate-200/50 drop-shadow-sm'>
                    <NaturesForm fetch={fetchNatures} />
                </div>
            </div>
        </div>
    )
}

export default Dialog
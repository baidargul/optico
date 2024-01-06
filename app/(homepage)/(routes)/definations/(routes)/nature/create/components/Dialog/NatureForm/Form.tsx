import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

type Props = {}

const Form = (props: Props) => {
    return (
        <div className='flex flex-col gap-2'>
            <div>
                <div>
                    Name:
                </div>
                <div>
                    <Input />
                </div>
            </div>
            <div>
                {/* <button className='bg-zinc-300 text-site-mainText active:bg-yellow-100  focus:outline-none p-1 rounded-md px-2 focus:ring-1 focus:ring-yellow-400 drop-shadow-sm'>Create</button> */}
                <Button variant={'secondary'}>Create</Button>
                <Button>Create</Button>
            </div>
        </div>
    )
}

export default Form
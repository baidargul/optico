import React from 'react'
import Row from './Row'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'


type Props = {}

const Grid = (props: Props) => {
    return (
        <div className='mt-4'>
            <div>
                <ScrollArea className='h-[300px] pr-2 p-1 mb-4 bg-white/70'>
                    <Row />
                    <Row />
                    <Row />
                    <Row />
                    <Row />
                    <Row />
                    <Row />
                </ScrollArea>
                <div className='grid grid-cols-2 '>
                    <div>
                        
                    </div>
                    <div className='ml-auto'>
                        <div className='grid grid-cols-2 w-fit gap-20'>
                            <div className=''>
                                <div className='font-semibold'>
                                    Sub-Total
                                </div>
                                <div>
                                    Freight
                                </div>
                                <div className='font-semibold'>
                                    Total
                                </div>
                                <div>
                                    Paid
                                </div>
                                <div className='font-semibold'>
                                    Balance
                                </div>
                            </div>
                            <div className='mr-auto'>
                                <div className='font-semibold'>
                                    Rs 24000
                                </div>
                                <div>
                                    <Input type='number' className='h-6 text-sm'/>
                                </div>
                                <div className='font-semibold'>
                                    Rs 24350
                                </div>
                                <div>
                                    <Input type='number' className='h-6 text-sm'/>
                                </div>
                                <div className='font-semibold text-md'>
                                    Rs 150
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Grid
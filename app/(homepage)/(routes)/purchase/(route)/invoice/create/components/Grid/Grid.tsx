import React from 'react'
import Row from './Row'
import { ScrollArea } from '@/components/ui/scroll-area'


type Props = {}

const Grid = (props: Props) => {
    return (
        <div className='mt-4'>
            <ScrollArea className='h-[300px] pr-2 bg-white'>
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            </ScrollArea>
        </div>
    )
}

export default Grid
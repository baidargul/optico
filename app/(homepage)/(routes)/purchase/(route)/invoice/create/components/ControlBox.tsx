import SelectProviderAdvance from '@/components/Select/SelectProviderAdvance'
import React from 'react'

type Props = {}

const ControlBox = (props: Props) => {
    return (
        <div className='p-1'>
            <div>
                <SelectProviderAdvance key={1234} />
            </div>
        </div>
    )
}

export default ControlBox
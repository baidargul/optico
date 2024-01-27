import React from 'react'

type Props = {}

const AccountRow = (props: Props) => {
    return (
        <div className='flex justify-center items-center border-b'>
            <div className='grid grid-cols-3 justify-items-center p-1'>
                <div>Sunny Mobiles</div>
                <div>Vendor</div>
                <div className='ml-auto'>Rs 40000</div>
            </div>
        </div>
    )
}

export default AccountRow
import React from 'react'

type Props = {}

const OrderDetails = (props: Props) => {
    return (
        <div className='grid grid-cols-2 gap-1 w-[20%]'>
            <div>
                <div>Order #</div>
                <div>Date</div>
                <div>Status</div>
            </div>
            <div>
                <div>442901</div>
                <div>27-Jan-2024</div>
                <div>Open</div>
            </div>
        </div>
    )
}

export default OrderDetails
import AccountSelection from '@/components/App/AccountSelection'
import React from 'react'

type Props = {}

const VendorSelect = (props: Props) => {
    return (
        <div className='grid grid-cols-2 gap-1 w-[20%]'>
            <div>
                <div>Vendor</div>
                <div>Contact</div>
                <div>Phone</div>
                <div>Email</div>
                <div>Address</div>
            </div>
            <div>
                <AccountSelection>
                    <div>Sunny Mobiles, Jhang</div>
                </AccountSelection>
                <div>Saif</div>
                <div>03438793471</div>
                <div>baidargul@outlook.com</div>
                <div>Random street, xyz.</div>
            </div>
        </div>
    )
}

export default VendorSelect
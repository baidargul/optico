import { formalizeText } from '@/lib/my'
import React from 'react'

type Props = {
    account?: any
}

const AccountRow = (props: Props) => {
    const  account  = props.account

    return (
        <div className='flex justify-center items-center cursor-pointer'>
            <div className='grid grid-cols-3 justify-items-center p-1 hover:bg-yellow-50/80 w-full'>
                <div className='mr-auto'>{formalizeText(account.name)}</div>
                <div>Vendor</div>
                <div className='ml-auto'>Rs {account.balance ? account.balance : 0}</div>
            </div>
        </div>
    )
}

export default AccountRow
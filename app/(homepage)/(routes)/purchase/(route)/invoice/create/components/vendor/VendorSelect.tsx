'use client'
import AccountSelection from '@/components/App/AccountSelection'
import { formalizeText } from '@/lib/my'
import React from 'react'

type Props = {}

const VendorSelect = (props: Props) => {
    const [selectedAccount, setSelectedAccount] = React.useState<any>(null)
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
                <AccountSelection mode='vendor' setValue={setSelectedAccount}>
                    <div>{selectedAccount ? formalizeText(selectedAccount.name) : "Select account"}</div>
                </AccountSelection>
                <div>{selectedAccount? formalizeText(selectedAccount.contact): " - "}</div>
                <div>{selectedAccount? formalizeText(selectedAccount.phone): " - "}</div>
                <div>{selectedAccount? formalizeText(selectedAccount.email): " - "}</div>
                <div>{selectedAccount? formalizeText(selectedAccount.address): " - "}</div>
            </div>
        </div>
    )
}

export default VendorSelect
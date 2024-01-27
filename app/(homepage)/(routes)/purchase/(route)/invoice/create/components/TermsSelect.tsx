import React from 'react'

type Props = {}

const TermsSelect = (props: Props) => {
    return (
        <div className='grid grid-cols-2 gap-1 w-[20%]'>
            <div>
                <div>Terms</div>
                <div>V. Order #</div>
                <div>Location</div>
                <div>Site:</div>
            </div>
            <div>
                <div>15 Days credit</div>
                <div>16924</div>
                <div>Shop warehouse</div>
                <div>Shop warehouse, top floor besides washroom</div>
            </div>
        </div>
    )
}

export default TermsSelect
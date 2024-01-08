import React from 'react'

type Props = {
    params: any
}

const page = (props: Props) => {
    const id = props.params.id
    return (
        <div>
            <div>
                {
                    id
                }
            </div>
        </div>
    )
}

export default page
import React from 'react'

type Props = {
    id: string,
}

const Dynamic = (props: Props) => {



    return (
        <div>
            <div>
                {props.id}
            </div>
        </div>
    )
}

export default Dynamic
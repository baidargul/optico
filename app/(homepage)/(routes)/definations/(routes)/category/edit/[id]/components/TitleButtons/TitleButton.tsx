'use client'
import React from 'react'
import Button from './components/Button'
import { Eye } from 'lucide-react'

type Props = {
    category: any
}

const TitleButtons = (props: Props) => {

    const handlePreviewCategoryControls = () => {
        window.open(`preview/${props.category.id}`, "_blank")
    }

    return (
        <Button icon={Eye} onClick={handlePreviewCategoryControls} />
    )
}

export default TitleButtons
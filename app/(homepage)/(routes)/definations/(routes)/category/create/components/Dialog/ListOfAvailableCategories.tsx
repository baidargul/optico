'use client'
import { category, nature } from "@prisma/client"
import React, { useEffect, useState } from 'react'
import Category from "./ListOfAvailableNatures/Category"

type Props = {
    categories: any
    fetch: any
}

const ListOfAvailableCategories = (props: Props) => {
    const [availableCategories, setAvailableCategories] = useState<any>(props.categories)

    useEffect(() => {
        setAvailableCategories(props.categories)
    }, [props.categories])

    if (!availableCategories || availableCategories.length < 1) {
        return <div className="text-site-noFoundText font-sans">No categories found.</div>;
    }

    return (
        <div className="">
            <div className="text-sm font-semibold text-site-mainText py-1 border-b border-dashed border-site-mainText/30 mb-2">
                Categories:
            </div>
            <div>
                {
                    availableCategories && availableCategories.map((category: category) => (
                        <div key={category.id}>
                            <Category category={category} fetch={props.fetch}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ListOfAvailableCategories;

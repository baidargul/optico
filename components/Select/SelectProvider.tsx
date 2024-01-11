import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const sampleValues = ["single", "multiple", "text", "number", "boolean"]

type Props = {
    placeholder?: string
    label?: string
    onChange: any
    defaultValue: any
    values: any
    scale?: 75 | 90 | 100
}

export function SelectProvider(props: Props) {
    const scaleProperty = props.scale ? `scale-${props.scale}` : "scale-100"

    let margin= ""
        if (props.scale) {
            switch (props.scale) {
                case 75:
                    margin = "-ml-16"
                    break;
                case 90:
                    margin = "-ml-3"
                    break;
                case 100:
                    margin = "mr-auto"
                    break;
                default:
                    margin = ""
                    break;
            }
        }

    return (
        <div className={`${scaleProperty} ${margin}`}>
        <Select onValueChange={props.onChange} defaultValue={props.defaultValue}>
            <SelectTrigger className="w-[180px] text-xs">
                <SelectValue placeholder={props.placeholder ? props.placeholder : "Select"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{props.label ? props.label : "Select"}</SelectLabel>
                    {
                        props.values.map((value:string)=>{

                            return(
                                <SelectItem value={value}>{formalizeText(value)}</SelectItem>

                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>

        </div>
    )
}

function formalizeText(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

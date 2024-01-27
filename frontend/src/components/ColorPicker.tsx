import {RgbStringColorPicker} from "react-colorful";
import {SingleColor} from "../types/SingleColor.ts";

type colorProps = {
    handleSetData: (prevData: (prevData: never) => number[][]) => void
    color:SingleColor
    index:number
}
export default function ColorPicker(props:colorProps) {


    function handleColorChange(colorString: string, index: number) {
        const colorArray = colorString
            .substring(4, colorString.length - 1)
            .split(",")
            .map(singleString => parseInt(singleString.trim(), 10));

        props.handleSetData(prevData => {
            const updatedData:number[][] = [...prevData];
            updatedData[index] = colorArray;
            return updatedData;
        });
    }

    return (
        <>
            <RgbStringColorPicker
                color={`rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`}
                onChange={(newColor) => handleColorChange(newColor, props.index)}
            />
        </>
    )
}
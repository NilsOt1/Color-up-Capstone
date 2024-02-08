import {RgbStringColorPicker} from "react-colorful";
import {SingleColor} from "../../types/SingleColor.ts";
import {SetStateAction} from "react";

type ColorPickerProps = {
    handleSetSavedColors: (color: SetStateAction<SingleColor[]>) => void
    color:SingleColor
    index:number
}
export default function ColorPicker(props:Readonly<ColorPickerProps>) {


    function handleColorChange(colorString: string, index: number) {
        const colorArray = colorString
            .substring(4, colorString.length - 1)
            .split(",")
            .map(singleString => parseInt(singleString.trim(), 10));

        props.handleSetSavedColors(prevData => {
            const updatedSavedColors:SingleColor[] | SingleColor = [...prevData];
            updatedSavedColors[index] = colorArray;
            return updatedSavedColors;
        });
    }

    return (
            <RgbStringColorPicker
                color={`rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`}
                onChange={(newColor) => handleColorChange(newColor, props.index)}
            />
    )
}

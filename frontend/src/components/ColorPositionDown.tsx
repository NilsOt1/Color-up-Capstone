import {SingleColor} from "../types/SingleColor.ts";
import {SetStateAction} from "react";
import arrowDown from "../assets/arrowDown.svg"

type ColorPositionDownProps = {
    savedColors: SingleColor[] | undefined
    handleSetSavedColors: (color: SetStateAction<SingleColor[] | undefined>) => void
    index: number
}

export default function ColorPositionDown(props: ColorPositionDownProps) {
    function moveColorDown(index: number) {
        if (index === 4) return;
        const newSavedColors = [...props.savedColors];
        const temp = newSavedColors[index];
        newSavedColors[index] = newSavedColors[index + 1];
        newSavedColors[index + 1] = temp;
        props.handleSetSavedColors(newSavedColors);
    }

    return <button onClick={() => moveColorDown(props.index)}><img alt={"arrow down icon"} src={arrowDown}/></button>

}
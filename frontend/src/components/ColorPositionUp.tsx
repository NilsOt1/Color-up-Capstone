import {SingleColor} from "../types/SingleColor.ts";
import {SetStateAction} from "react";
import arrowUp from "../assets/arrowUp.svg"

type ColorPositionUpProps = {
    savedColors: SingleColor[] | undefined
    handleSetSavedColors: (color: SetStateAction<SingleColor[] | undefined>) => void
    index: number
}

export default function ColorPositionUp(props: ColorPositionUpProps) {
    function moveColorUp(index: number) {
        if (index === 0) return;
        const newSavedColors = [...props.savedColors];
        const temp = newSavedColors[index];
        newSavedColors[index] = newSavedColors[index - 1];
        newSavedColors[index - 1] = temp;
        props.handleSetSavedColors(newSavedColors);
    }

    return <button onClick={() => moveColorUp(props.index)}><img alt={"arrow up icon"} src={arrowUp}/></button>
}
import {SingleColor} from "../types/SingleColor.ts";

type DisplayedColorProps = {
    color: SingleColor
    handleSetLockedColor: (updateColor: SingleColor[] | SingleColor | []) => void;
    lockedColors: SingleColor[] | SingleColor | []
}
export default function LockColor(props:DisplayedColorProps) {


    function toggleLockColor(color: SingleColor | string) {
        if (props.lockedColors?.includes(color)) {

            const updatedColors: SingleColor[] | SingleColor | [] = props.lockedColors?.filter(savedColor =>
                JSON.stringify(savedColor) !== JSON.stringify(color)
            );
            props.handleSetLockedColor(updatedColors);
        } else {
            props.handleSetLockedColor([...props.lockedColors, color]);
        }
    }
    return (
        <>
            <button
                onClick={() => toggleLockColor(props.color)}>{props.lockedColors?.includes(props.color) ? "Unlock" : "Lock"}</button>
        </>
    )
}
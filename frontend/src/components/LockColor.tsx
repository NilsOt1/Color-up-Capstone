import {SingleColor} from "../types/SingleColor.ts";
import lockOpen from "../assets/lockOpen.svg";
import lockClose from "../assets/lockClose.svg";
import styled from "styled-components";


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
            <StyledLockButton
                onClick={() => toggleLockColor(props.color)}>{props.lockedColors?.includes(props.color) ? <img alt={"lockOpenIcon"} src={lockOpen}/> : <img alt={"lockCloseIcon"} src={lockClose}/>}</StyledLockButton>
        </>
    )
}

const StyledLockButton = styled.button`
    border: none;
  height: 40px;
  width: 70px;
    
`
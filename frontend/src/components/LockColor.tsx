import {SingleColor} from "../types/SingleColor.ts";
import lockOpen from "../assets/lockOpen.svg";
import lockClose from "../assets/lockClose.svg";
import styled from "styled-components";


type LockColorProps = {
    color: SingleColor
    handleSetLockedColor: (updateColor: SingleColor[]) => void;
    lockedColors: SingleColor[]
}
export default function LockColor(props: LockColorProps) {

    function toggleLockColor(color: SingleColor) {
        if (props.lockedColors?.includes(color)) {

            const updatedColors: SingleColor[] = props.lockedColors?.filter(savedColor =>
                JSON.stringify(savedColor) !== JSON.stringify(color)
            );
            props.handleSetLockedColor(updatedColors);
        } else {
            props.handleSetLockedColor([...props.lockedColors, color]);
        }
    }

    return (
        <StyledLockButton
            onClick={() => toggleLockColor(props.color)}>
            {props.lockedColors?.includes(props.color) ?
                <img alt={"lock close Icon"} src={lockClose}/>
                :
                <img alt={"lockOpenIcon"} src={lockOpen}/>}
        </StyledLockButton>
    )
}

const StyledLockButton = styled.button`
  border: none;
  height: 40px;
  width: 70px;
  box-shadow: none;
`

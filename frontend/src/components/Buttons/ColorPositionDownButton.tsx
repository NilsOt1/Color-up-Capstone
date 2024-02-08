import {SingleColor} from "../../types/SingleColor.ts";
import {SetStateAction} from "react";
import arrowDown from "../../assets/arrowDown.svg"
import styled from "styled-components";

type ColorPositionDownProps = {
    savedColors: SingleColor[]
    handleSetSavedColors: (color: SetStateAction<SingleColor[]>) => void
    index: number
}

export default function ColorPositionDownButton(props: Readonly<ColorPositionDownProps>) {
    function moveColorDown(index: number) {
        if (index === 4) return;
        const newSavedColors = [...props.savedColors];
        const temp = newSavedColors[index];
        newSavedColors[index] = newSavedColors[index + 1];
        newSavedColors[index + 1] = temp;
        props.handleSetSavedColors(newSavedColors);
    }

    if (props.index === 4) {
        return null
    } else {
        return (
            <StyledPositionButton
                onClick={() => moveColorDown(props.index)}>
                <img alt={"arrow down icon"}
                     src={arrowDown}/>
            </StyledPositionButton>
        )
    }
}

const StyledPositionButton = styled.button`
  border: none;
  box-shadow: none;
  margin-right: 5px;
`

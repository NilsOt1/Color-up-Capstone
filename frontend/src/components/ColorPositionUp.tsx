import {SingleColor} from "../types/SingleColor.ts";
import {SetStateAction} from "react";
import arrowUp from "../assets/arrowUp.svg"
import styled from "styled-components";

type ColorPositionUpProps = {
    savedColors: SingleColor[]
    handleSetSavedColors: (color: SetStateAction<SingleColor[]>) => void
    index: number
}

export default function ColorPositionUp(props: Readonly<ColorPositionUpProps>) {
    function moveColorUp(index: number) {
        if (index === 0) return;
        const newSavedColors = [...props.savedColors];
        const temp = newSavedColors[index];
        newSavedColors[index] = newSavedColors[index - 1];
        newSavedColors[index - 1] = temp;
        props.handleSetSavedColors(newSavedColors);
    }

    if (props.index === 0) {
        return null
    } else {
        return (
            <StyledPositionButton
                onClick={() => moveColorUp(props.index)}>
                <img alt={"arrow up icon"} src={arrowUp}/>
            </StyledPositionButton>
        )
    }
}

const StyledPositionButton = styled.button`
  border: none;
  box-shadow: none;
  margin-right: 5px;
`

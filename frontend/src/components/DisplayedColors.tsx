import axios from "axios";
import {SetStateAction, useEffect, useState} from "react";
import {SingleColor} from "../types/SingleColor.ts";
import LockColor from "./LockColor.tsx";
import {useParams} from "react-router";
import SaveButton from "./SaveButton.tsx";
import styled from "styled-components";
import HexCode from "./HexCode.tsx";
import ColorPicker from "./ColorPicker.tsx";
import GenerateColorsButton from "./GenerateColorsButton.tsx";

export default function DisplayedColors() {

    const [activeColorIndex, setActiveColorIndex] = useState<number>(-1);
    const [lockedColors, setLockedColors] = useState<SingleColor[] | SingleColor | []>([])
    const initialData: SingleColor[] =
        [
            [149, 52, 26],
            [181, 173, 105],
            [148, 115, 73],
            [80, 36, 26],
            [68, 19, 8]
        ];
    const [savedColors, setSavedColors] = useState<SingleColor[] | undefined>(initialData)

    const {colorRoomSetId} = useParams()

    useEffect(() => {
        getColorRoomSetById()
    }, []);

    function handleSetLockedColor(updateColor: SingleColor[] | SingleColor | []) {
        setLockedColors(updateColor)
    }

    function getColorRoomSetById() {
        axios
            .get("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/color-room-sets/" + colorRoomSetId)
            .then(response => {
                setSavedColors(response.data.savedColors.result.length != 0 ? response.data.savedColors.result : initialData);
            })

            .catch(error => {
                console.error("Error", error)
            })
    }

    function handleSetSavedColors(color: SetStateAction<SingleColor[] | undefined>) {
        setSavedColors(color)
    }

    function handleDivClick(index: number) {
        setActiveColorIndex(index === activeColorIndex ? -1 : index);
    }

    if (!savedColors) {
        return "loading...";
    }

    return (
        <>
            {savedColors.map((color: SingleColor, index: number) => (
                <StyledDivContainer
                    key={index}>
                    <StyledColorDiv
                        style={{
                            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                        }}
                        onClick={() => handleDivClick(index)}
                    >
                        {activeColorIndex === index && (
                            <ColorPicker handleSetSavedColors={handleSetSavedColors} color={color} index={index}/>
                        )}
                    </StyledColorDiv>
                    <StyledLockHexContainer>
                        <LockColor
                            color={color}
                            handleSetLockedColor={handleSetLockedColor}
                            lockedColors={lockedColors}/>
                        <HexCode color={color}/>
                    </StyledLockHexContainer>
                </StyledDivContainer>
            ))}
            <StyledButtonContainer>
                <GenerateColorsButton lockedColors={lockedColors} handleSetSavedColors={handleSetSavedColors}/>
                <SaveButton colorsToSave={savedColors}/>
            </StyledButtonContainer>
        </>
    );
}

const StyledDivContainer = styled.div`
  display: flex;
`

const StyledColorDiv = styled.div`
  height: 100px;
  width: 230px;
  margin-left: 20px;
  margin-right: 20px;
  transition: background-color 1s ease-in;
`

const StyledLockHexContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
`


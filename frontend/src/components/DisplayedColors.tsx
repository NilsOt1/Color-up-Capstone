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
import ColorPositionUp from "./ColorPositionUp.tsx";
import ColorPositionDown from "./ColorPositionDown.tsx";

export default function DisplayedColors() {

    const [activeColorIndex, setActiveColorIndex] = useState<number>(-1);
    const [lockedColors, setLockedColors] = useState<SingleColor[]>([])
    const initialData: SingleColor[] =
        [
            [149, 52, 26],
            [181, 173, 105],
            [148, 115, 73],
            [80, 36, 26],
            [68, 19, 8]
        ];
    const [savedColors, setSavedColors] = useState<SingleColor[]>(initialData)
    const {colorRoomSetId} = useParams()

    useEffect(() => {
        getColorRoomSetById()
    }, []);

    function handleSetLockedColor(updateColor: SingleColor[]) {
        setLockedColors(updateColor)
    }

    function handleSetSavedColors(color: SetStateAction<SingleColor[]>) {
        setSavedColors(color)
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

    function handleDivClick(index: number) {
        setActiveColorIndex(index === activeColorIndex ? -1 : index);
    }

    if (!savedColors) {
        return "loading...";
    }

    return (
        <>
            {savedColors?.map((color: SingleColor, index: number) => (
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
                    <StyledArrowContainer>
                        <ColorPositionUp
                            savedColors={savedColors}
                            handleSetSavedColors={handleSetSavedColors}
                            index={index}/>
                        <ColorPositionDown
                            savedColors={savedColors}
                            handleSetSavedColors={handleSetSavedColors}
                            index={index}/>
                    </StyledArrowContainer>
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
                <GenerateColorsButton lockedColors={lockedColors} handleSetSavedColors={handleSetSavedColors}
                                      savedColors={savedColors} initialData={initialData}/>
                <SaveButton colorsToSave={savedColors}/>
            </StyledButtonContainer>
        </>
    );
}

const StyledDivContainer = styled.div`
  display: flex;
`

const StyledColorDiv = styled.div`
  height: calc(100vh / 5 - 40px);
  width: 29vh;
  margin-left: 20px;
  margin-right: 8px;
  transition: background-color 0.5s ease-in;
  box-shadow: 20px 0 30px rgba(0, 0, 0, 0.5);
`

const StyledLockHexContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

const StyledButtonContainer = styled.div`
  display: flex;
  margin-top: 5px;
  width: 50vh;
`

const StyledArrowContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

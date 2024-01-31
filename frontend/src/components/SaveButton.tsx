import axios from "axios";
import {useParams} from "react-router";
import {SingleColor} from "../types/SingleColor.ts";
import styled from "styled-components";
import {useState} from "react";
import save from "../assets/save.svg"

type SaveButtonProps = {
    colorsToSave: SingleColor[]
}

export default function SaveButton(props: SaveButtonProps) {

    const [isSaved, setIsSaved] = useState(false);

    const {colorRoomSetId} = useParams<string>()

    function updateColorPalette() {

        const colorsAsJSON = {
            result: props.colorsToSave
        }

        axios
            .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/update-colors/" + colorRoomSetId, colorsAsJSON, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 1200);
            })
            .catch(error => console.log("Error", error))
    }

    return (
        <>
            {isSaved ? (
                <StyledSaveImg alt={"save icon"} src={save}/>
            ) : (
                <StyledSaveColorButton onClick={updateColorPalette}>Save</StyledSaveColorButton>
            )}
        </>)
}

const StyledSaveColorButton = styled.button`
  font-weight: 100;
  display: flex;
  border: 0.5px solid;
  font-size: 1.3em;
  padding: 5px 10px;
  background-color: #3B3B3BFF;
`

const StyledSaveImg = styled.img`
  height: 35px;
  width: 65px;
  padding: 0;
  border: 0.5px solid;
  border-radius: 10px;
  background-color: #3B3B3BFF;
`

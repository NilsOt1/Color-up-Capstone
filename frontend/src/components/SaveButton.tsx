import axios from "axios";
import {useParams} from "react-router";
import {SingleColor} from "../types/SingleColor.ts";
import styled from "styled-components";

type ColorsProps = {
    colorsToSave: SingleColor[]
}

export default function SaveButton(props: ColorsProps) {

    const {colorRoomSetId} = useParams<string>()

    function updateColorPalette() {

        const colorsAsJSON = {
            result: props.colorsToSave
        }
        console.log(colorsAsJSON)

        axios
            .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/update-colors/" + colorRoomSetId, colorsAsJSON, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .catch(error => console.log("Error", error))
    }

    return (
            <StyledSaveButton onClick={updateColorPalette}>Save</StyledSaveButton>
    )
}
const StyledSaveButton = styled.button`
  font-weight: 100;
  display: flex;
  border: 0.5px solid;
  font-size: 1.3em;
  padding: 5px 10px;
  background-color: #3B3B3BFF;
`

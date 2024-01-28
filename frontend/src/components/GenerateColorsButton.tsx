import {SingleColor} from "../types/SingleColor.ts";
import axios from "axios";
import loading1 from "../assets/loading1.svg";
import {SetStateAction, useState} from "react";
import styled from "styled-components";


type displayedColorsProps = {
    lockedColors:SingleColor[] | SingleColor | []
    handleSetSavedColors: (color: SetStateAction<SingleColor[] | undefined>) => void

}
export default function GenerateColorsButton(props:displayedColorsProps) {

    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    function generateMatchingColors(): void {
        setShowSpinner(true)
        const savedColorArray: SingleColor | string[] | (SingleColor | string)[] | (SingleColor & string)[]= [...props.lockedColors]

        while (savedColorArray.length < 5) {
            console.log("SavedColorArray: ", savedColorArray)
            savedColorArray.push("N")
        }

        const requestBody: {
            input: SingleColor | string[] | (SingleColor | string)[],
            model: string
        } = {

            input: savedColorArray,
            model: 'default'
        }

        axios.post("/api/colors", requestBody)
            .then(response => {
                const newColors = [...props.lockedColors, ...response.data.result]
                props.handleSetSavedColors(newColors.slice(0, 5))
            })
            .catch(error => {
                console.error('Error fetching', error);
            });

        setTimeout(() => {
            setShowSpinner(false);
        }, 1200);
    }

    return (
        <StyledGenerateButton onClick={generateMatchingColors}>
            {showSpinner ? <img src={loading1} alt="loading Icon" height={20}/> : "Generate"}
        </StyledGenerateButton>
    )
}

const StyledGenerateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  border: 0.5px solid;
  border-radius: 5px;
  font-size: 1.3em;
`;
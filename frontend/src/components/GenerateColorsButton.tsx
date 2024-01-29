import {SingleColor} from "../types/SingleColor.ts";
import axios from "axios";
import loading from "../assets/loading.svg";
import {SetStateAction, useState} from "react";
import styled from "styled-components";


type displayedColorsProps = {
    lockedColors: SingleColor[] | SingleColor | []
    handleSetSavedColors: (color: SetStateAction<SingleColor[] | undefined>) => void
    savedColors: SingleColor[] | undefined
    initialData: SingleColor[]
}
export default function GenerateColorsButton(props: displayedColorsProps) {

    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    function isColorLocked(index: number): boolean {
        return props.lockedColors.some(color => JSON.stringify(color) === JSON.stringify(props.savedColors[index]));
    }

    function generateMatchingColors(): void {
        setShowSpinner(true)
        const savedColorArray: (SingleColor | string)[] = [];

        for (let i = 0; i < props.initialData.length; i++) {
            // Überprüfen, ob die Farbe gelockt ist
            if (isColorLocked(i)) {
                // Wenn ja, füge die gelockte Farbe aus lockedColors an der aktuellen Position hinzu
                savedColorArray.push(props.lockedColors.find(color => JSON.stringify(color) === JSON.stringify(props.savedColors[i])) || props.initialData[i]);
            } else {
                // Wenn nicht, füge "N" an der entsprechenden Position hinzu
                savedColorArray.push("N");
            }
        }


        const requestBody: {
            input?: SingleColor | string[] | (SingleColor | string)[],
            model: string
        } = {

            model: 'default'
        }

        const allN = savedColorArray.every(color => color === "N");


        if (!allN) {
            requestBody.input = savedColorArray;
        }
        console.log("initial:", props.initialData)
        console.log("savedColorArray: ", savedColorArray)
        console.log("locked: ", props.lockedColors)

        axios.post("/api/colors", requestBody)
            .then(response => {
                const newColors = [...props.lockedColors, ...response.data.result];
                const updatedData = [...props.savedColors];

                const unlockedColors = newColors.filter(color => !props.lockedColors.some(lockedColor => JSON.stringify(color) === JSON.stringify(lockedColor)));

                updatedData.forEach((color, index) => {
                    if (isColorLocked(index)) {
                        updatedData[index] = color;
                    } else {
                        updatedData[index] = unlockedColors.shift() || props.initialData[index];
                    }
                });
                props.handleSetSavedColors(updatedData);
                console.log("response: ", response.data.result)
                console.log("requestBody: ", requestBody.input)
                console.log("savedColors: ", props.savedColors)
                console.log("updatedData: ", updatedData)

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
            {showSpinner ? <img src={loading} alt="loading Icon" height={30}/> : "Generate"}
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
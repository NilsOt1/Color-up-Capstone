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

        const allN:boolean = savedColorArray.every(color => color === "N");


        if (!allN) {
            requestBody.input = savedColorArray;
        }

        axios.post("/api/colors", requestBody)
            .then(response => {
                const newColors = response.data.result.map((color, index) => {
                    if (isColorLocked(index)) {
                        return props.lockedColors[index];
                    } else {
                        return color;
                    }
                });

                const updatedData = [...props.savedColors];

                const unlockedColors = newColors.filter((color, index) => !isColorLocked(index));

                updatedData.forEach((color, index) => {
                    if (!isColorLocked(index)) {
                        updatedData[index] = unlockedColors.shift();
                    }
                });

                props.handleSetSavedColors(updatedData);
            })
            .catch(error => {
                console.error('Error fetching', error);
            });

        setTimeout(() => {
            setShowSpinner(false);
        }, 1000);
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
  margin: 3px 20px;
  width: 230px;
  font-size: 1.3em;
  background-color: #3b3b3b;
`;

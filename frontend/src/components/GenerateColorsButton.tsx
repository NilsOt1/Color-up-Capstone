import {SingleColor} from "../types/SingleColor.ts";
import axios from "axios";
import loading from "../assets/loading.svg";
import {SetStateAction, useState} from "react";
import styled from "styled-components";


type GenerateColorsButtonProps = {
    lockedColors: SingleColor[]
    handleSetSavedColors: (color: SetStateAction<SingleColor[]>) => void
    savedColors: SingleColor[]
    initialData: SingleColor[]
}
export default function GenerateColorsButton(props: GenerateColorsButtonProps) {

    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    function isColorLocked(index: number): boolean {
        return props.lockedColors.some(color => JSON.stringify(color) === JSON.stringify(props.savedColors[index]));
    }

    function generateMatchingColors(): void {
        setShowSpinner(true)
        const savedColorArray: (SingleColor | string)[] = [];

        for (let i:number = 0; i < props.initialData.length; i++) {
            if (isColorLocked(i)) {
                savedColorArray.push((props.lockedColors.find((color: SingleColor) => JSON.stringify(color) === JSON.stringify(props.savedColors[i])) || props.initialData[i]))
            } else {
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
                const newColors = response.data.result.map((color: SingleColor, index:number) => {
                    if (isColorLocked(index)) {
                        return props.lockedColors[index];
                    } else {
                        return color;
                    }
                });

                const updatedData:SingleColor[] = [...props.savedColors];

                const unlockedColors = newColors.filter((_color: SingleColor, index: number) => !isColorLocked(index));

                updatedData.forEach((_color:SingleColor, index) => {
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
`

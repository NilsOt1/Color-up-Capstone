import axios from "axios";
import {useEffect, useState} from "react";
import {SingleColor} from "../types/SingleColor.ts";
import {Room} from "../types/Room.ts";
import {ColorPalette} from "../types/ColorPalette.ts";
import LockColor from "./LockColor.tsx";
import {useParams} from "react-router";
import SaveButton from "./SaveButton.tsx";
import styled from "styled-components";
import {RgbStringColorPicker} from "react-colorful";


export default function DisplayedColors() {


    const [lockedColors, setLockedColors] = useState<SingleColor[] | SingleColor | []>([])
    const [colorRoomSet, setColorRoomSet] = useState<{
        colorRoomSetId: string,
        room: Room,
        savedColors: ColorPalette | []
    }>({colorRoomSetId: "", room: {roomId: "", roomName: ""}, savedColors: []})
    const initialData: SingleColor[] =
        [
            [149, 52, 26],
            [181, 173, 105],
            [148, 115, 73],
            [80, 36, 26],
            [68, 19, 8]
        ];
    const [data, setData] = useState<SingleColor[] | undefined>(initialData)
    const [activeColorIndex, setActiveColorIndex] = useState(-1);


    const {colorRoomSetId} = useParams()


    useEffect(() => {

        getColorRoomSetById()

    }, []);

    function handleSetLockedColor(updateColor: SingleColor[] | SingleColor | []) {
        setLockedColors(updateColor)
    }

    function generateMatchingColors(): void {

        const savedColorArray: SingleColor | string[] | (SingleColor | string)[] = [...lockedColors]

        while (savedColorArray.length < 5) {
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
                const newColors = [...lockedColors, ...response.data.result]
                setData(newColors.slice(0, 5))
            })
            .catch(error => {
                console.error('Error fetching', error);
            });
    }

    function getColorRoomSetById() {
        axios
            .get("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/color-room-sets/" + colorRoomSetId)
            .then(response => {
                setColorRoomSet(response.data)
                setData(response.data.savedColors.result.length != 0 ? response.data.savedColors.result : initialData);
            })

            .catch(error => {
                console.error("Error", error)
            })
    }

    function handleColorChange(colorString: string, index: number) {
        const colorArray = colorString
            .substring(4, colorString.length - 1)
            .split(",")
            .map(singleString => parseInt(singleString.trim(), 10));

        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[index] = colorArray;
            return updatedData;
        });
    }

    function handleDivClick(index: number) {
        setActiveColorIndex(index === activeColorIndex ? -1 : index);
    }

    if (!data) {
        return "loading...";
    }

    return (
        <>
            {data.map((color: SingleColor, index: number) => (
                <StyledDivContainer
                    key={index}>
                    <StyledColorDiv
                        style={{
                            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`

                        }}
                        onClick={() => handleDivClick(index)}
                    >
                        {activeColorIndex === index && (
                            <RgbStringColorPicker
                                color={`rgb(${color[0]}, ${color[1]}, ${color[2]})`}
                                onChange={(newColor) => handleColorChange(newColor, index)}
                            />
                        )}
                    </StyledColorDiv>

                    <LockColor
                        color={color}
                        handleSetLockedColor={handleSetLockedColor}
                        lockedColors={lockedColors}/>
                </StyledDivContainer>
            ))}
            <button onClick={generateMatchingColors}>Generate Colors</button>
            <SaveButton colorsToSave={data}/>
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
`

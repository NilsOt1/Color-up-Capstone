import axios from "axios";
import {SetStateAction, useEffect, useRef, useState} from "react";
import {SingleColor} from "../types/SingleColor.ts";
import {Room} from "../types/Room.ts";
import {ColorPalette} from "../types/ColorPalette.ts";
import LockColor from "./LockColor.tsx";


type ColorProps = {
    colorRoomSet: {
        colorRoomSetId: string,
        room: Room,
        savedColors: ColorPalette | []
    }
    getColorRoomSetById: () => void
}
export default function DisplayedColors(props: ColorProps) {

    const [data, setData] = useState<SingleColor[]>([])
    const [lockedColors, setLockedColors] = useState<SingleColor[] | SingleColor | []>([])


    useEffect(() => {

        generateMatchingColors()
        props.getColorRoomSetById()
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

        return (
            <>
                <button onClick={generateMatchingColors}>Generate Colors</button>

                {(props.colorRoomSet.savedColors?.result?.length === 0 || !Array.isArray((props.colorRoomSet.savedColors?.result))) ? (
                    data?.map((color: SingleColor, index: number) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                                width: '100px',
                                height: '100px',
                            }}
                        >
                            <LockColor
                                color={color}
                                handleSetLockedColor={handleSetLockedColor}
                                lockedColors={lockedColors}/>
                        </div>
                    ))
                ) : (
                    props.colorRoomSet.savedColors?.result?.map((color: SingleColor, index: number) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor:`rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                                width: '100px',
                                height: '100px',
                            }}
                        >
                            <LockColor
                                color={color}
                                handleSetLockedColor={handleSetLockedColor}
                                lockedColors={lockedColors}/>
                        </div>
                    ))
                )}
            </>
        );
    }

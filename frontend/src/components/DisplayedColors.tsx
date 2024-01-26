import axios from "axios";
import {useEffect, useState} from "react";
import {SingleColor} from "../types/SingleColor.ts";
import {Room} from "../types/Room.ts";
import {ColorPalette} from "../types/ColorPalette.ts";
import LockColor from "./LockColor.tsx";
import {useParams} from "react-router";



export default function DisplayedColors() {

    const [data, setData] = useState<SingleColor[]>([])
    const [lockedColors, setLockedColors] = useState<SingleColor[] | SingleColor | []>([])
    const [colorRoomSet, setColorRoomSet] = useState<{
        colorRoomSetId: string,
        room: Room,
        savedColors: ColorPalette | []
    }>({ colorRoomSetId: "", room: { roomId: "", roomName: "" }, savedColors: [] })

    const {colorRoomSetId} = useParams()


    useEffect(() => {

        generateMatchingColors()
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
            })

            .catch(error => {
                console.error("Error", error)
            })
    }

    return (
        <>
            {(colorRoomSet.savedColors?.result?.length === 0 || !Array.isArray((colorRoomSet.savedColors?.result))) ? (
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
                colorRoomSet.savedColors?.result?.map((color: SingleColor, index: number) => (
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
            )}
            <button onClick={generateMatchingColors}>Generate Colors</button>
        </>
    );
}

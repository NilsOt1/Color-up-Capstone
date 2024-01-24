import axios from "axios";
import {useEffect, useState} from "react";
import {SingleColor} from "../types/SingleColor.ts";
import {useParams} from "react-router";
import {Room} from "../types/Room.ts";

export default function Colors() {

    const initialColorRoomSet = {
        colorRoomSetId: "",
        room: {
            roomId: "",
            roomName: "",
        },
        savedColors: [],
    };

    const [data, setData] = useState<SingleColor[] | null>(null)
    const [savedColors, setSavedColors] = useState<SingleColor[] | string[] | (SingleColor | string)[]>([])
    const [colorRoomSet, setColorRoomSet] = useState<{
        colorRoomSetId: string,
        room: Room,
        savedColors: SingleColor[]
    }>(initialColorRoomSet)

    const {colorRoomSetId} = useParams()

    useEffect(() => {
        getColorRoomSetById();
        getRandomColors()
    }, []);

    function getRandomColors(): void {

        const requestBody: { model: string } = {
            model: "default"
        }
        axios
            .post("/api/colors", requestBody)
            .then(response => setData(response.data.result))
            .catch(error => {
                console.error("Error", error)
            })
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

    function generateMatchingColors(): void {

        const savedColorArray: SingleColor[] | string[] | (SingleColor | string)[] = [...savedColors]

        while (savedColorArray.length < 5) {
            savedColorArray.push("N")
        }

        const requestBody: {
            input: SingleColor[] | string[] | (SingleColor | string)[],
            model: string
        } = {

            input: savedColorArray,
            model: 'default'
        }

        axios.post("/api/colors", requestBody)
            .then(response => {
                const newColors = [...savedColors, ...response.data.result]
                setData(newColors.slice(0, 5))
            })
            .catch(error => {
                console.error('Error fetching', error);
            });
    }

    return (
        <>
            <button onClick={getRandomColors}>Get random Colors</button>
            <button onClick={generateMatchingColors}>Generate Colors</button>

            {data?.map((color: SingleColor, index: number) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                            width: '100px',
                            height: '100px',
                        }}
                    >
                    </div>
                )
            )}
        </>
    );
}


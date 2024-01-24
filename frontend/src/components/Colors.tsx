import axios from "axios";
import {useState} from "react";
import {SingleColor} from "../types/SingleColor.ts";

export default function Colors() {

    const [data, setData] = useState<SingleColor[] | null>(null)
    const [savedColors, setSavedColors] = useState<SingleColor[]>([])

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

    function generateMatchingColors(): void {

        const savedColorArray: SingleColor[] = [...savedColors]

        while (savedColorArray.length < 5) {
            savedColorArray.push("N")
        }

        const requestBody = {

            input: savedColorArray,
            model: 'default'
        }

        axios.post('/api/colors', requestBody)
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
            {data?.map((color: SingleColor, index: number) => {
                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                            width: '100px',
                            height: '100px',
                        }}
                    ></div>

                );
            })}
        </>
    )
}


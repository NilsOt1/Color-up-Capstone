import axios from "axios";
import {useState} from "react";
import {ColorPaletteType} from "../types/ColorPaletteType.ts";
import {SingleColor} from "../types/SingleColor.ts";

export default function ColorPalette() {

    const [data, setData] = useState<ColorPaletteType>([])


    function getRandomColors(): void {

        const requestBody: { model: string } = {
            model: "default"
        }

        axios.post("/api/getColors", requestBody)
            .then(response => setData(response.data.result))
            .catch(error => {
                console.error("Error", error)
            })

    }

    console.log(data)

    return (
        <>
            <button onClick={getRandomColors}>Post</button>
            {data.map((color:SingleColor, index:number) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                        width: '100px',
                        height: '100px',
                    }}
                ></div>
            ))}
        </>
    )
}


import axios from "axios";
import {useState} from "react";
import {SingleColor} from "../types/SingleColor.ts";

export default function Colors() {

    const [data, setData] = useState<SingleColor[] | null>(null)

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

    return (
        <>
            <button onClick={getRandomColors}>Get random Colors</button>
            {data?.map((color:SingleColor, index:number) => {
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


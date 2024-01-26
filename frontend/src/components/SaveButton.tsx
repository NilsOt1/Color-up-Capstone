import axios from "axios";
import {useParams} from "react-router";
import {SingleColor} from "../types/SingleColor.ts";

type ColorsProps = {
    colorsToSave: SingleColor[]
}

export default function SaveButton(props: ColorsProps) {

    const {colorRoomSetId} = useParams<string>()

    function updateColorPalette() {

        const colorsAsJSON = {
            result: props.colorsToSave
        }
        console.log(colorsAsJSON)

        axios
            .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/update-colors/" + colorRoomSetId, colorsAsJSON, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => console.log(response.data))
            .catch(error => console.log("Error", error))
    }

    return (
        <>
        <button onClick={updateColorPalette}>Save Colors</button>
        </>
    )
}


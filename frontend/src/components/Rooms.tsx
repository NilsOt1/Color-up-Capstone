import axios from "axios";
import {useState} from "react";
import {ColorRoomSet} from "../types/ColorRoomSet.ts";

export default function Rooms() {

    const [colorRoomSets, setColorRoomSets] = useState<ColorRoomSet[]>([]);
    function fetchAllColorRoomSets() {
        axios.get("api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/color-room-sets")
            .then(response => setColorRoomSets(response.data))
            .catch(error => {
                console.error("error information: ", error)
            })
    }

    return (
        <>
            <button onClick={fetchAllColorRoomSets}>All ColorRoomSets</button>
        </>
    )
}
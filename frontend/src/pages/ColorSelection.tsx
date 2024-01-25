import {useState} from "react";
import axios from "axios";
import {Room} from "../types/Room.ts";
import {ColorPalette} from "../types/ColorPalette.ts";
import {useParams} from "react-router";
import DisplayedColors from "../components/DisplayedColors.tsx";

export default function ColorSelection() {

    const [colorRoomSet, setColorRoomSet] = useState<{
        colorRoomSetId: string,
        room: Room,
        savedColors: ColorPalette | []
    }>({ colorRoomSetId: "", room: { roomId: "", roomName: "" }, savedColors: [] })

    const {colorRoomSetId} = useParams()



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
        <DisplayedColors colorRoomSet={colorRoomSet} getColorRoomSetById={getColorRoomSetById}/>
    )

}
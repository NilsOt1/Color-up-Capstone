import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {ColorPalette} from "../../../types/ColorPalette.ts";
import {Room} from "../../../types/Room.ts";
import {ColorRoomSetDto} from "../../../types/ColorRoomSetDto.ts";
import {User} from "../../../types/User.ts";

export default function CreateNewRoom() {

    const [data, setData] = useState<User>()
    const [roomName, setRoomName] = useState<string>("")

    function saveNewColorRoomSet() {

        const defaultColorPalette: ColorPalette = {

            result: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]
        };

        const createdRoom: Room = {
            roomId: "12",
            roomName: roomName
        };

        const createdColorRoomSetDto: ColorRoomSetDto = {
            room: createdRoom,
            savedColors: defaultColorPalette
        };

        axios
            .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e", createdColorRoomSetDto)
            .then(response => setData(response.data))
            .catch(error => {
                console.error("Error", error)
            })
        console.log(data)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        saveNewColorRoomSet()
        setRoomName("")
    }

    function onInputName(event: ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"roomName"}>Room Name</label>
            <input id={"roomName"}
                   type={"text"}
                   value={roomName}
                   onChange={onInputName}
            />
            <button type={"submit"}>Create</button>
        </form>
    )
}
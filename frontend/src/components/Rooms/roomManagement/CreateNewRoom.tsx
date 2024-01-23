import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {ColorPalette} from "../../../types/ColorPalette.ts";
import {Room} from "../../../types/Room.ts";
import {ColorRoomSetDto} from "../../../types/ColorRoomSetDto.ts";
import {User} from "../../../types/User.ts";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";

type RoomProps = {
    colorRoomSets: ColorRoomSet[]
    fetchAllColorRoomSets: () => void
}

export default function CreateNewRoom(props: RoomProps) {

    const [data, setData] = useState<User>()
    const [roomName, setRoomName] = useState<string>("")
    const [createMode, setCreateMode] = useState<boolean>(false);

    function handleCreateClick() {
        setCreateMode(true);
    }

    function handleCancelClick() {
        setCreateMode(false);
    }

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
            .then(response => {
                setData(response.data)
                props.fetchAllColorRoomSets()
            })
            .catch(error => {
                console.error("Error", error)
            })
        console.log(data)

    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        if (props.colorRoomSets.length < 5) {
            event.preventDefault()
            saveNewColorRoomSet()
            setRoomName("")
        } else {
            alert("Sorry, the max number of rooms is 5")
        }
    }

    function onInputName(event: ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value)
    }

    return (
        <>
            {
                createMode ? (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor={"roomName"}>Room Name</label>
                        <input id={"roomName"}
                               type={"text"}
                               value={roomName}
                               onChange={onInputName}
                        />
                        <button type={"submit"}>Create</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </form>
                ) : (
                    <button onClick={handleCreateClick}>Create Room</button>
                )
            }
        </>
    );
}

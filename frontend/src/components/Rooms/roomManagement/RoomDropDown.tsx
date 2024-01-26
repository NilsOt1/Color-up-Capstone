import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";


export default function RoomDropDown() {

    const [colorRoomSets, setColorRoomSets] = useState<ColorRoomSet[]>([])
    const [showRoom, setShowRoom] = useState<boolean>(true)
    const {colorRoomSetId} = useParams<string>()
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllColorRoomSets()
        handleShowRoom()
    }, [colorRoomSetId]);

    function fetchAllColorRoomSets(): void {
        axios.get("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/color-room-sets")
            .then(response => setColorRoomSets(response.data))
            .catch(error => {
                console.error("error information: ", error)
            })
    }

    function handleShowRoom() {
        setShowRoom((prevShowRoom) => !prevShowRoom)
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue: string = event.target.value;

        navigate(`/color-selection/room/${selectedValue}`);
    };

    const currentRoom: ColorRoomSet | undefined = colorRoomSets.find((room: ColorRoomSet) => room.colorRoomSetId === colorRoomSetId);

    console.log(showRoom)

    return (
        <div>
            {showRoom ?
                (<h1 onClick={(handleShowRoom)}>{`${currentRoom?.room?.roomName}`}</h1>
                ) : (
                    <select onChange={handleSelectChange} value={currentRoom?.colorRoomSetId}>
                        {colorRoomSets.map((room: ColorRoomSet) => (
                            <option key={room.colorRoomSetId} value={room.colorRoomSetId}
                                    onClick={() => setShowRoom(false)}>{room.room.roomName}
                            </option>
                        ))}
                    </select>)
            }
        </div>
    );
}

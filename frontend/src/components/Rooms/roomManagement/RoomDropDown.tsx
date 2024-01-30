import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import styled from "styled-components";


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

    return (
        <div>
            {showRoom ?
                (<StyledHeading onClick={(handleShowRoom)}>{`${currentRoom?.room?.roomName}`}</StyledHeading>
                ) : (
                    <StyledDropDown onChange={handleSelectChange} value={currentRoom?.colorRoomSetId}>
                        {colorRoomSets.map((room: ColorRoomSet) => (
                            <option key={room.colorRoomSetId} value={room.colorRoomSetId}
                                    onClick={() => setShowRoom(false)}>{room.room.roomName}
                            </option>
                        ))}
                    </StyledDropDown>)
            }
        </div>
    )
}

const StyledHeading = styled.h1`
  text-align: center;
  font-size: 2.5em;
  font-weight: 100;
  color: #BBBBBBFF;
  margin: 10px 70px 0px 0px;
  text-decoration: underline;
  text-decoration-thickness: 1px;
`

const StyledDropDown = styled.select`
  text-align: center;
  font-size: 1.5em;
  font-weight: 100;
  margin: 10px 30px 20px 50px;
  color: #5B5B5BFF;
  text-decoration: underline;
  text-decoration-thickness: 0.5px;
  background-color: #BBBBBBFF;
  border-radius: 10px;
`

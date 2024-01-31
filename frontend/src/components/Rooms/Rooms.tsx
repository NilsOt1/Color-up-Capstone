import axios from "axios";
import {useEffect, useState} from "react";
import {ColorRoomSet} from "../../types/ColorRoomSet.ts";
import SingleRoom from "./roomManagement/SingleRoom.tsx";
import styled from "styled-components";
import CreateNewRoom from "./roomManagement/CreateNewRoom.tsx";

export default function Rooms() {

    const [colorRoomSets, setColorRoomSets] = useState<ColorRoomSet[]>([]);

    useEffect((): void => {
        fetchAllColorRoomSets()
    }, []);


    function fetchAllColorRoomSets(): void {
        axios.get("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/color-room-sets")
            .then(response => setColorRoomSets(response.data))
            .catch(error => {
                console.error("error information: ", error)
            })
    }
    return (
        <>
            <StyledHeading>Rooms</StyledHeading>
            <StyledUl>
                {colorRoomSets.map(set => (
                        <SingleRoom
                            key={set.colorRoomSetId}
                            colorRoomSet={set}
                            fetchAllColorRoomSets={fetchAllColorRoomSets}
                        >
                            {set.room.roomName}
                        </SingleRoom>
                    )
                )}
            </StyledUl>
            <CreateNewRoom colorRoomSets={colorRoomSets} fetchAllColorRoomSets={fetchAllColorRoomSets}/>
        </>
    )
}

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledHeading = styled.h1`
  color: #BBBBBBFF;
  text-align: center;
  font-size: 3.5em;
  font-weight: 100;
  margin: 50px 0 20px 0;
  text-decoration: underline;
  text-decoration-thickness: 1px;
`

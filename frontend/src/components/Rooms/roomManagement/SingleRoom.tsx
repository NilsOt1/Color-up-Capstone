import {Link} from "react-router-dom";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";
import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {User} from "../../../types/User.ts";


type RoomProps = {
    colorRoomSet: ColorRoomSet
    children: ReactNode
    fetchAllColorRoomSets: () => void
}
export default function SingleRoom(props: Readonly<RoomProps>) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [newRoomName, setNewRoomName] = useState<string>(props.colorRoomSet.room.roomName)
    const [data, setData] = useState<User | null>(null)

    function deleteColorRoomSet(): void {

        const shouldDelete = window.confirm("Are you sure you want to delete this room?");
        if (shouldDelete) {
            axios
                .put("/api/user" + "/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e" + "/delete-set/" + props.colorRoomSet.colorRoomSetId)
                .then(response => {
                    console.log("DELETE room successfully", response.data);
                    props.fetchAllColorRoomSets();
                })
                .catch(error => {
                    console.error("DELETE did not work:", error)
                })
        }
    }

    function handleEditClick(): void {
        setEditMode(true)
    }

    function handleSaveEdit(): void {
        changeRoomName();
        setEditMode(false)
    }

    function handleCancelEdit(): void {
        setEditMode(false);
        setNewRoomName(props.colorRoomSet.room.roomName)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setNewRoomName(event.target.value)
    }

    function changeRoomName() {
        axios
            .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/update-name/" + props.colorRoomSet.colorRoomSetId, newRoomName, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(response => {
                setData(response.data)
                props.fetchAllColorRoomSets()
            })

            .catch(error => console.log("Error", error))
        console.log(data)
    }

    useEffect(() => {

    }, [props.colorRoomSet]);

    return (
        <StyledRoomsContainer>
            {editMode ? (
                <>
                    <input type={"text"} value={newRoomName} onChange={handleInputChange}/>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <StyledRoomLink
                        to={`/colorSelection/room/${props.colorRoomSet.colorRoomSetId}`}>
                        <StyledListItem>{props.children}</StyledListItem>
                    </StyledRoomLink>
                    <button onClick={deleteColorRoomSet}>delete</button>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )
            }
        </StyledRoomsContainer>
    )
}

export const StyledListItem = styled.li`
  list-style-type: none;
  left: 600px;

  border: 0.5px solid;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 5px;
  font-size: 1.3em;
`;

export const StyledRoomLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;

export const StyledRoomsContainer = styled.span`
  display: flex;
  align-items: center;
`;
import {Link} from "react-router-dom";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";
import {ReactNode, useState} from "react";
import styled from "styled-components";
import DeleteRoomButton from "./DeleteRoomButton.tsx";
import EditRoomNameButton from "./EditRoomNameButton.tsx";

type SingleRoomProps = {
    colorRoomSet: ColorRoomSet
    children: ReactNode
    fetchAllColorRoomSets: () => void
}
export default function SingleRoom(props: Readonly<SingleRoomProps>) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [newRoomName, setNewRoomName] = useState<string>(props.colorRoomSet.room.roomName)

    function handleSetEditMode(boolean: boolean) {
        setEditMode(boolean)
    }

    function handleSetNewRoomName(newName: string) {
        setNewRoomName(newName)
    }

    return (
        <>
            {editMode ? (

                    <EditRoomNameButton newRoomName={newRoomName} colorRoomSet={props.colorRoomSet}
                                        fetchAllColorRoomSets={props.fetchAllColorRoomSets}
                                        editMode={editMode}
                                        handleSetEditMode={handleSetEditMode}
                                        handleSetNewRoomName={handleSetNewRoomName}/>
            ) : (
                <StyledRoomsContainer>
                    <DeleteRoomButton colorRoomSet={props.colorRoomSet}
                                      fetchAllColorRoomSets={props.fetchAllColorRoomSets}/>
                    <EditRoomNameButton newRoomName={newRoomName} colorRoomSet={props.colorRoomSet}
                                        fetchAllColorRoomSets={props.fetchAllColorRoomSets}
                                        editMode={editMode}
                                        handleSetEditMode={handleSetEditMode}
                                        handleSetNewRoomName={handleSetNewRoomName}/>
                    <StyledRoomLink
                        to={`/color-selection/room/${props.colorRoomSet.colorRoomSetId}`}>
                        <StyledListItem>{props.children}</StyledListItem>
                    </StyledRoomLink>
                </StyledRoomsContainer>
            )
            }
        </>
    )
}

export const StyledListItem = styled.li`
  list-style-type: none;
  left: 600px;

  border: 0.5px solid;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 0px;
  font-size: 1.3em;
`;

export const StyledRoomLink = styled(Link)`
  text-decoration: none;
  border: none;
  font-weight: 100;
  
`;

export const StyledRoomsContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
`;

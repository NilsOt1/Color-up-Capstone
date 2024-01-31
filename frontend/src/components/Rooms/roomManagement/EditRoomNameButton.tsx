import axios from "axios";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";
import pen from "../../../assets/pen.svg";
import {ChangeEvent} from "react";
import styled from "styled-components";

type EditRoomNameButton = {
    colorRoomSet: ColorRoomSet
    editMode: boolean
    fetchAllColorRoomSets: () => void
    handleSetEditMode: (boolean: boolean) => void
    handleSetNewRoomName: (newName: string) => void
    newRoomName: string
}

export default function EditRoomNameButton(props: EditRoomNameButton) {

    function handleEditClick(): void {
        props.handleSetEditMode(true)
    }

    function handleSaveEdit(): void {
        changeRoomName();
        props.handleSetEditMode(false)
    }

    function handleCancelEdit(): void {
        props.handleSetEditMode(false);
        props.handleSetNewRoomName(props.colorRoomSet.room.roomName)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        props.handleSetNewRoomName(event.target.value)
    }

    function changeRoomName() {
        axios
            .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/update-name/" + props.colorRoomSet.colorRoomSetId, props.newRoomName, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(() => {
                props.fetchAllColorRoomSets();
            })

            .catch(error => console.log("Error", error))
    }

    return (
        <>
            {props.editMode ? (
                <StyledNewNameContainer>
                    <StyledNewRoomNameInput type={"text"} value={props.newRoomName} onChange={handleInputChange}/>
                    <StyledButtonContainer>
                        <StyledButton onClick={handleSaveEdit}>Save</StyledButton>
                        <StyledButton onClick={handleCancelEdit}>Cancel</StyledButton>
                    </StyledButtonContainer>
                </StyledNewNameContainer>
            ) : (
                <StyledEditButton onClick={handleEditClick}>
                    <img alt={"penIcon"} src={pen}/>
                </StyledEditButton>

            )}</>)
}

const StyledEditButton = styled.button`
  border: none;
`

const StyledNewNameContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: solid 0.5px #1a1a1a;
  border-top: solid 0.5px #afafaf;
  margin: 5px 40px 5px 0;
  padding: 10px 0px;
  border-radius: 20px;
`

const StyledNewRoomNameInput = styled.input`
  height: 30px;
  width: 200px;
  display: flex;
  font-size: 1.3em;
`

const StyledButton = styled.button`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px 5px;
  height: 30px;
  width: 90px;
  font-size: 1.3em;
  font-weight: 100;
`

const StyledButtonContainer = styled.span`
  display: flex;
  justify-content: center;
  padding: 0;
`
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {Room} from "../../../types/Room.ts";
import {ColorRoomSetDto} from "../../../types/ColorRoomSetDto.ts";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";
import styled from "styled-components";

type RoomProps = {
    colorRoomSets: ColorRoomSet[]
    fetchAllColorRoomSets: () => void
}

export default function CreateNewRoom(props: Readonly<RoomProps>) {

    const [roomName, setRoomName] = useState<string>("")
    const [createMode, setCreateMode] = useState<boolean>(false);

    function handleCreateClick() {
        setCreateMode(true);
    }

    function handleCancelClick() {
        setCreateMode(false);
    }

    function saveNewColorRoomSet() {

        const createdRoom: Room = {
            roomId: roomName,
            roomName: roomName
        };

        const createdColorRoomSetDto: ColorRoomSetDto = {
            room: createdRoom,
            savedColors: {result: []}
        };

        axios
            .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e", createdColorRoomSetDto)
            .then(() => {
                    props.fetchAllColorRoomSets()
                }
            )
            .catch(error => {
                console.error("Error", error)
            })
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
                    <StyledForm onSubmit={handleSubmit}>
                        <StyledFormLabel htmlFor={"roomName"}>New Room</StyledFormLabel>
                        <StyledRoomNameInput id={"roomName"}
                                             type={"text"}
                                             value={roomName}
                                             onChange={onInputName}
                        />
                        <StyledFormButtonContainer>
                            <StyledFormButton type={"submit"}>Create</StyledFormButton>
                            <StyledFormButton onClick={handleCancelClick}>Cancel</StyledFormButton>
                        </StyledFormButtonContainer>
                    </StyledForm>
                ) : (
                    <StyledNewRoomButton onClick={handleCreateClick}>+</StyledNewRoomButton>
                )
            }
        </>
    );
}

const StyledNewRoomButton = styled.button`

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  height: 50px;
  width: 50px;
  box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5);
  font-size: 2.5em;
  font-weight: 200;
  border: solid 1px;
  border-radius: 30px;
`;

const StyledRoomNameInput = styled.input`
  height: 30px;
  width: 200px;
  display: flex;
  font-size: 1.3em;
`

const StyledFormButtonContainer = styled.span`
  display: flex;
  justify-content: center;
`

const StyledFormButton = styled.button`
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

export const StyledFormLabel = styled.label`
  display: flex;
  justify-content: center;
  font-size: 1.3em;
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  border-bottom: solid 0.5px #1a1a1a;
  border-top: solid 0.5px #afafaf;
  border-radius: 20px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

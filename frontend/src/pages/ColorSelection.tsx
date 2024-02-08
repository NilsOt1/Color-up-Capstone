import DisplayedColors from "../components/Colors/DisplayedColors.tsx";
import RoomDropDown from "../components/Rooms/roomManagement/RoomDropDown.tsx";
import styled from "styled-components";
import BackButton from "../components/Buttons/BackButton.tsx";
import Header from "../components/Header.tsx";

export default function ColorSelection() {
    return (
        <>
            <Header/>
            <StyledContainer>
                <BackButton/>
                <RoomDropDown/>
            </StyledContainer>
            <DisplayedColors/>
        </>
    )
}

const StyledContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 5px 20px 10px 0;
`

import DisplayedColors from "../components/DisplayedColors.tsx";
import InfoButton from "../components/InfoButton.tsx";
import RoomDropDown from "../components/Rooms/roomManagement/RoomDropDown.tsx";
import styled from "styled-components";
import BackButton from "../components/BackButton.tsx";

export default function ColorSelection() {
    return (
        <>
            <StyledContainer>
                <BackButton/>
                <RoomDropDown/>
                <InfoButton/>
            </StyledContainer>
            <DisplayedColors/>
        </>
    )
}

const StyledContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 5px 20px 20px 0;`

export const StyledButtonContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 5px 20px 20px 0;
`;
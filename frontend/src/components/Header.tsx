import styled from "styled-components";
import logo from "../assets/logo.png";
import InfoButton from "./InfoButton.tsx";


export default function Header() {
    return (
        <StyledContainer>
            <StyledLogoTitleContainer>
            <StyledLogo alt={"Color up logo"} src={logo}/>
            <StyledTitle>ColorUp</StyledTitle>
            </StyledLogoTitleContainer>
            <InfoButton/>
        </StyledContainer>
    )
}

const StyledContainer = styled.span`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #575757;
  border-radius: 10px;
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.5);
  padding-bottom: 5px;
`

const StyledTitle = styled.p`
  color: #8c8a8a;
  display: flex;
  align-items: end;
  font-size: 1.3em;
  margin: 8px 0px 0px 8px;
`

const StyledLogo = styled.img`
margin-bottom: 2px;
  margin-top: 2px;
`

const StyledLogoTitleContainer = styled.div`
  display: flex;
  align-items: end;
margin-left: 120px;
`

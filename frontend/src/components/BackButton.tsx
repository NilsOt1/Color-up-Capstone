import styled from "styled-components";
import {Link} from "react-router-dom";
import backArrow from "../assets/backArrow.svg";

export default function BackButton() {
    return (
            <StyledBackLink to={"/room-selection"}>
                <img alt={"Back arrow"} src={backArrow}/>
            </StyledBackLink>
    )
}

const StyledBackLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border: none;
  box-shadow: none;
  height: 60px;
  width: 60px;
`

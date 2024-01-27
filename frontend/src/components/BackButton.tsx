import styled from "styled-components";
import {Link} from "react-router-dom";
import backArrow from "../assets/BackArrow.svg";


export default function BackButton() {
    return (
        <>
            <StyledBackLink to={"/room-selection"}>
                <img alt={"Back arrow"} src={backArrow}/>
            </StyledBackLink>
        </>
    )
}

const StyledBackLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 60px;
  width: 60px;
`
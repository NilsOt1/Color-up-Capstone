import {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

export default function ButtonBar() {

    const [showInfo, setShowInfo] = useState<boolean>(false);

    function handleToggleInfo() {
        setShowInfo(true);

        setTimeout(() => {
            setShowInfo(false);
        }, 12000);
    }

    function handleCloseInfo() {
        setShowInfo(false)
    }

    return (
        <>
            {showInfo ? (
                <StyledInfoText
                    onClick={handleCloseInfo}
                    $show={showInfo.toString()}>
                    How to ColorUP? - It`s a piece of cake. You simply choose three colors
                    that are very prominent in your room and then press the button.
                </StyledInfoText>
            ) : null}

            <StyledButtonContainer>
                <StyledBackLink to={"/room-selection"}>Back</StyledBackLink>
                <button onClick={handleToggleInfo}>i</button>
            </StyledButtonContainer>
        </>
    )
}

export const StyledButtonContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 20px 0 0;
`;

export const StyledBackLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px;
  border-radius: 30px;
  height: 60px;
  width: 60px;
`;

export const StyledInfoText = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: #000;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$show ? "block" : "none")};

  &::before {
    content: "x";
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 16px;
    font-weight: 400;
  }
`;
import {useState} from "react";
import styled from "styled-components";

export default function InfoButton() {

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
                    onClick={handleCloseInfo}>
                    How to ColorUP? - It`s a piece of cake. You simply choose some colors
                    that are very prominent in your room, lock them and then press the button.
                </StyledInfoText>
            ) : null}
                <StyledInfoButton onClick={handleToggleInfo}>?</StyledInfoButton>
        </>
    )
}

export const StyledInfoText = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: #4b4b4b;
  color: #a8a8a8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const StyledInfoButton = styled.button`
  color: #7c7b7b;
  border-radius: 30px;
  margin-top: 9px;
  margin-right: 10px;
  height: 30px;
  width: 30px;
  font-size: 1.5em;
`

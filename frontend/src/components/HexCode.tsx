import {SingleColor} from "../types/SingleColor.ts";
import styled from "styled-components";

type colorProps = {
    color:SingleColor
}
export default function HexCode(props:colorProps) {

    function rgbToHex(r: number, g: number, b: number):(string) {
        function toHex(c: number) {
            const hex:string = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    return (
        <StyledHex>
            {rgbToHex(props.color[0], props.color[1], props.color[2])}
        </StyledHex>
    )
}

const StyledHex = styled.div`
  color: #d5d5d5;
`
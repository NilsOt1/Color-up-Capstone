import {SingleColor} from "../types/SingleColor.ts";

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
        <div>
            {rgbToHex(props.color[0], props.color[1], props.color[2])}
        </div>
    )
}
import {Link} from "react-router-dom";
import {ColorRoomSet} from "../types/ColorRoomSet.ts";
import {ReactNode} from "react";


type ColorRoomSetProps = {
    colorRoomSet: ColorRoomSet
    children: ReactNode
}
export default function SingleRoom(props: ColorRoomSetProps) {
    return (
        <>
            <Link to={"/colorSelection"}>{props.children}</Link>
        </>
    )
}
import {Link} from "react-router-dom";
import {ColorRoomSet} from "../types/ColorRoomSet.ts";
import {ReactNode} from "react";
import styled from "styled-components";


type ColorRoomSetProps = {
    colorRoomSet: ColorRoomSet
    children: ReactNode
}
export default function SingleRoom(props: ColorRoomSetProps) {
    return (
        <>
            <StyledRoomLink to={"/colorSelection"}><StyledListItem>{props.children}</StyledListItem></StyledRoomLink>
        </>
    )
}

export const StyledListItem = styled.li`
  list-style-type: none;
  left: 600px;

  border: 0.5px solid;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 5px;
  font-size: 1.3em;
`;

export const StyledRoomLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;
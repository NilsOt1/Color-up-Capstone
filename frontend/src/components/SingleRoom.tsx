import {Link} from "react-router-dom";
import {ColorRoomSet} from "../types/ColorRoomSet.ts";
import {ReactNode} from "react";
import styled from "styled-components";
import axios from "axios";


type ColorRoomSetProps = {
    colorRoomSet: ColorRoomSet
    children: ReactNode
    fetchAllColorRoomSets:() => void
}
export default function SingleRoom(props: ColorRoomSetProps) {


function deleteColorRoomSet() {
    axios
        .put("/api/user" + "/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e" + "/delete-set/" + props.colorRoomSet.colorRoomSetId)
        .then(response => {
            console.log("DELETE room successfull", response.data)
        })
        .catch(error => {
            console.error("DELETE did not work:", error)
        })
}

    return (
        <span>
            <button onClick={deleteColorRoomSet}>delete</button>
            <StyledRoomLink
                to={"/colorSelection"}>
                <StyledListItem>{props.children}</StyledListItem>
            </StyledRoomLink>
        </span>
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
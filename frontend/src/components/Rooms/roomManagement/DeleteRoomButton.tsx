import axios from "axios";
import {ColorRoomSet} from "../../../types/ColorRoomSet.ts";
import trash from "../../../assets/trash.svg";
import styled from "styled-components";

type DeleteRoomButtonProps = {
    colorRoomSet: ColorRoomSet
    fetchAllColorRoomSets: () => void
}
export default function DeleteRoomButton(props: DeleteRoomButtonProps) {
    function deleteColorRoomSet(): void {

        const shouldDelete = window.confirm("Are you sure you want to delete this room?");
        if (shouldDelete) {
            axios
                .put("/api/user/cf0ff01b-8d19-4211-9a0b-6eb0aeec165e/delete-set/" + props.colorRoomSet.colorRoomSetId)
                .then(response => {
                    console.log("DELETE room successfully", response.data);
                    props.fetchAllColorRoomSets();
                })
                .catch(error => {
                    console.error("DELETE did not work:", error)
                })
        }
    }

    return (
        <StyledDeleteButton onClick={deleteColorRoomSet}>
            <img
                alt={"trashIcon"}
                src={trash}/>
        </StyledDeleteButton>
    )
}

const StyledDeleteButton = styled.button`
  border: none;
`

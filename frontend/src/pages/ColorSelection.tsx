import DisplayedColors from "../components/DisplayedColors.tsx";
import ButtonBar from "../components/ButtonBar.tsx";
import RoomDropDown from "../components/Rooms/roomManagement/RoomDropDown.tsx";

export default function ColorSelection() {
    return (
        <>
            <RoomDropDown/>
            <ButtonBar/>
            <DisplayedColors/>
        </>
    )
}
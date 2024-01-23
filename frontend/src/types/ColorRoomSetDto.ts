import {Room} from "./Room.ts";
import {ColorPalette} from "./ColorPalette.ts";

export type ColorRoomSetDto = {
    room: Room;
    savedColors: ColorPalette;
};
import {Room} from "./Room.ts";
import {ColorPaletteType} from "./ColorPaletteType.ts";

export type ColorRoomSetDto = {
    room: Room;
    savedColors: ColorPaletteType;
};
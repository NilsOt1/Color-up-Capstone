import {Room} from "./Room.ts";
import {ColorPaletteType} from "./ColorPaletteType.ts";

export type ColorRoomSet = {
    colorRoomSetId: string
    room: Room
    savedColors: ColorPaletteType
}
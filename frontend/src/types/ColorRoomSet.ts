import {Room} from "./Room.ts";
import {ColorPalette} from "./ColorPalette.ts";

export type ColorRoomSet = {
    colorRoomSetId: string
    room: Room
    savedColors: ColorPalette
}
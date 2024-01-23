import {ColorRoomSet} from "./ColorRoomSet.ts";

export type User = {
    userId: string
    userName: string
    colorRoomSets: ColorRoomSet[]
}
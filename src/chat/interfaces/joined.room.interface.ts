import { RoomI } from "./room.interface";
import { UserI } from "./user.interface";

export interface JoinedRoomI {
    id?: number;
    socketId: string;
    user? : UserI ; //it could be this
    room: RoomI;
}
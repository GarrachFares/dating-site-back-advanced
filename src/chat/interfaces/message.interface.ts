import { UserI } from "./user.interface";
import { Meta } from "./meta.interface";
import { RoomI } from "./room.interface";


export interface MessageI {
  id?: number;
  message?: string;
  user?: UserI;
  room?:RoomI ;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessagePaginateI {
  items: MessageI[];
  meta: Meta;
}

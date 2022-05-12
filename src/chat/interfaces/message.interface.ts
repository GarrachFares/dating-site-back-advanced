import { UserI } from "./user.interface";
import { Meta } from "./meta.interface";


export interface MessageI {
  id?: number;
  message?: string;
  user?: UserI;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessagePaginateI {
  messages: MessageI[];
  meta: Meta;
}

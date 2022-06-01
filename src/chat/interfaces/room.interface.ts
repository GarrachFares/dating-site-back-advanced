import { UserEntity } from "src/user/entity/user.entity";

export interface RoomI {
    id?: number;
    name?: string;
    description?: string;
    users?: UserEntity[];
    created_at?: Date;
    updated_at?: Date;
    image?:string;
  }

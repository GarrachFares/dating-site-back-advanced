import { timeStampable } from '../../Generics/timeStampable.entity';
import { RoomEntity } from 'src/chat/entity/room.entity';
import { MessageEntity } from "../../chat/entity/message.entity";
import { ConnectedUserEntity } from "src/chat/entity/connected.user.entity";
import { JoinedRoomEntity } from "src/chat/entity/joined.room.entity";
export declare class UserEntity extends timeStampable {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
    role: string;
    birthDate: string;
    country: string;
    city: string;
    rooms: RoomEntity[];
    connections: ConnectedUserEntity[];
    joinedRooms: JoinedRoomEntity[];
    messages: MessageEntity[];
    image: string;
}

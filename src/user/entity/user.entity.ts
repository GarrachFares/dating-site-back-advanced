import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { timeStampable } from '../../Generics/timeStampable.entity';
import { UserRoleEnum } from "../../Generics/enums/user-role.enum";
import { RoomEntity } from 'src/chat/entity/room.entity';
import { MessageEntity } from "../../chat/entity/message.entity";
import { ConnectedUserEntity } from "src/chat/entity/connected.user.entity";
import { JoinedRoomEntity } from "src/chat/entity/joined.room.entity";
import { CategoryEntity } from "src/chat/entity/category.entity";

@Entity('user')
export class UserEntity extends timeStampable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email : string ;

  @Column()
  password: string ;
  @Column()
  salt : string ;
  @Column({
    type : "enum",
    enum : UserRoleEnum ,
    default : UserRoleEnum.USER
  })
  role : string ;

  @Column({ type: 'date' , nullable : true})
  birthDate: string;

  @Column({nullable:true})
  country : string ;

  @Column({nullable:true})
  city : string ;

  @ManyToMany(() => RoomEntity, room => room.users)
  rooms: RoomEntity[]

  @OneToMany(()=> ConnectedUserEntity , connection => connection.user ) 
  connections: ConnectedUserEntity[] ;

  @OneToMany(()=> JoinedRoomEntity , joinedRoom => joinedRoom.room )
  joinedRooms: JoinedRoomEntity[]

  @OneToMany(()=>MessageEntity,messages=>messages.user)
  messages : MessageEntity[]

  @Column({nullable: true})
    image: string;

  @Column()
    sex: string;

  @Column("simple-array")
  categoris:string[];

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[]

}

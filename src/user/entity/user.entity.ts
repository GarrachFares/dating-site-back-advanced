import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { timeStampable } from '../../Generics/timeStampable.entity';
import { UserRoleEnum } from "../../Generics/enums/user-role.enum";
import { RoomEntity } from 'src/chat/entity/room.entity';
import { MessageEntity } from "../../chat/entity/message.entity";

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

  @OneToMany(()=>MessageEntity,messages=>messages.user)
  messages : MessageEntity[]

  @Column({nullable: true})
    image: string;

  @Column("simple-array")
  categoris:string[];

}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { timeStampable } from '../../Generics/timeStampable.entity';
import { UserRoleEnum } from "../../Generics/enums/user-role.enum";

@Entity('user')
export class UserEntity extends timeStampable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
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
}

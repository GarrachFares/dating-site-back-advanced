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

  @Column()
  country : string ;

  @Column()
  city : string ;

}

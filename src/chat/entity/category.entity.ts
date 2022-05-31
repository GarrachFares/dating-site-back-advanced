import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomEntity } from "./room.entity";

@Entity()
export class CategoryEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column({nullable: true})
  icon: string;

  @ManyToMany(() => UserEntity, user => user.categories)
  users: UserEntity[];

  @OneToMany(()=> RoomEntity , room => room.category )
  rooms: RoomEntity[] ;

} 

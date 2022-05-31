import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JoinedRoomEntity } from "./joined.room.entity";
import { MessageEntity } from "./message.entity";

@Entity()
export class RoomEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(()=> MessageEntity , message => message.room )
  messages: MessageEntity[] ;

  @OneToMany(()=> JoinedRoomEntity , joinedRoom => joinedRoom.room )
  joinedUsers: JoinedRoomEntity[] ;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

} 

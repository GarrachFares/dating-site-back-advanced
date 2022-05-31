import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
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

  @ManyToOne(() => CategoryEntity, category => category.rooms)
  @JoinColumn()
  category: CategoryEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

} 

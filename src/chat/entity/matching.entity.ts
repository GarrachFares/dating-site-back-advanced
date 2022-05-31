import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoomEntity } from "./room.entity";

@Entity()
export class MatchingEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.matches)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => RoomEntity, room => room.matches)
  @JoinColumn()
  room: RoomEntity;

  @Column("simple-array")
  preferenceList : string[];
}

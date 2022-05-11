import { UserEntity } from "src/user/entity/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class MessageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(()=>UserEntity,
              user=>user.messages)
  @JoinTable()
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

} 

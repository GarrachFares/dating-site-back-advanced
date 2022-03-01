import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { timeStampable } from '../../Generics/timeStampable.entity';

@Entity('user')
export class UserEntity extends timeStampable {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
  })
  pseudoName: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
}

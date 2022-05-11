import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    remove(id: string): Promise<void>;
    addUser(addUserDto: AddUserDto | UserEntity): Promise<(UserEntity | AddUserDto) & UserEntity>;
    createUser(addUserDto: AddUserDto): Promise<UserEntity>;
    findUserByUsername(username: string): Promise<UserEntity>;
    updateUser(user: UserEntity): Promise<import("typeorm").UpdateResult>;
}

import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { CredentialsDto } from "./dto/credentials.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    remove(id: string): Promise<void>;
    addUser(addUserDto: AddUserDto): Promise<AddUserDto & UserEntity>;
    register(userData: AddUserDto): Promise<Partial<UserEntity>>;
    login(credentials: CredentialsDto): Promise<Partial<UserEntity>>;
}

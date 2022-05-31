import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { CategoryEntity } from "src/chat/entity/category.entity";
export declare class UserService {
    private userRepository;
    private readonly categoryRepository;
    constructor(userRepository: Repository<UserEntity>, categoryRepository: Repository<CategoryEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    remove(id: string): Promise<void>;
    addUser(addUserDto: AddUserDto | UserEntity): Promise<(UserEntity | AddUserDto) & UserEntity>;
    createUser(addUserDto: AddUserDto): Promise<UserEntity>;
    findUserByUsername(username: string): Promise<UserEntity>;
    updateUser(user: UserEntity): Promise<import("typeorm").UpdateResult>;
    addCategories(cats: number[], user: UserEntity): Promise<UserEntity>;
    getCategoriesForUser(id: number): Promise<CategoryEntity[]>;
}

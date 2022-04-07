import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { CredentialsDto } from "./dto/credentials.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<UserEntity[]>;
    findOneById(id: string): Promise<UserEntity>;
    register(registerUserDto: AddUserDto): Promise<Partial<UserEntity>>;
    login(credentials: CredentialsDto): Promise<Partial<UserEntity>>;
}

import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AddUserDto } from './dto/add-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<UserEntity[]>;
    findOneById(id: string): Promise<UserEntity>;
    addUser(addUserDto: AddUserDto): Promise<UserEntity>;
}

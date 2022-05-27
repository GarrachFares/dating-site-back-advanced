import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<UserEntity[]>;
    findOneById(id: string): Promise<UserEntity>;
}

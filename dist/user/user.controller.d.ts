import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { CategoryEntity } from "src/chat/entity/category.entity";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<UserEntity[]>;
    addCategories(categories: any, user: any): Promise<UserEntity>;
    getUserCategories(user: any): Promise<CategoryEntity[]>;
    findOneById(id: string): Promise<UserEntity>;
}

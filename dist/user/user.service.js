"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../chat/entity/category.entity");
let UserService = class UserService {
    constructor(userRepository, categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        return this.userRepository.findOne(id);
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
    async addUser(addUserDto) {
        return this.userRepository.save(addUserDto);
    }
    async createUser(addUserDto) {
        return this.userRepository.create(addUserDto);
    }
    async findUserByUsername(username) {
        return this.userRepository.createQueryBuilder("user")
            .where("user.username = :username or user.email = :username", { username })
            .getOne();
    }
    async updateUser(user) {
        const id = user.id;
        console.log(user);
        return await this.userRepository.update(id, user);
    }
    async addCategories(cats, user) {
        if (!user) {
            throw new common_1.NotFoundException("You are not allowed to change username ");
        }
        const categories = await this.categoryRepository.createQueryBuilder('category')
            .where("category.id IN (:categories)", { categories: cats })
            .getMany();
        console.log("categories", categories);
        user.categories = categories;
        return this.userRepository.save(user);
    }
    async getCategoriesForUser(id) {
        const user = await this.userRepository.findOne(id, {
            relations: ['categories']
        });
        if (!user) {
            throw new common_1.NotFoundException("no user found");
        }
        return user.categories;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
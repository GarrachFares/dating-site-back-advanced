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
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOne(id);
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
    async addUser(addUserDto) {
        return this.userRepository.save(addUserDto);
    }
    async register(userData) {
        const user = this.userRepository.create(Object.assign({}, userData));
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try {
            await this.userRepository.save(user);
        }
        catch (e) {
            throw new common_1.ConflictException(`Le username et le email doivent être unique`);
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    }
    async login(credentials) {
        const { username, password } = credentials;
        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.username = :username or user.email = :username", { username })
            .getOne();
        if (!user)
            throw new common_1.NotFoundException("username or password incorrect ");
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (user.password === hashedPassword) {
            return {
                username: user.username,
                email: user.email
            };
        }
        else {
            throw new common_1.NotFoundException("username or password incorrect ");
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
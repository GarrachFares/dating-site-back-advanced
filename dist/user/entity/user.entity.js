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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const timeStampable_entity_1 = require("../../Generics/timeStampable.entity");
const user_role_enum_1 = require("../../Generics/enums/user-role.enum");
const room_entity_1 = require("../../chat/entity/room.entity");
const message_entity_1 = require("../../chat/entity/message.entity");
const connected_user_entity_1 = require("../../chat/entity/connected.user.entity");
const joined_room_entity_1 = require("../../chat/entity/joined.room.entity");
const category_entity_1 = require("../../chat/entity/category.entity");
const gender_enum_1 = require("../../Generics/enums/gender.enum");
const matching_entity_1 = require("../../chat/entity/matching.entity");
let UserEntity = class UserEntity extends timeStampable_entity_1.timeStampable {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: user_role_enum_1.UserRoleEnum,
        default: user_role_enum_1.UserRoleEnum.USER
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: gender_enum_1.GenderEnum
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "sexe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => room_entity_1.RoomEntity, room => room.users),
    __metadata("design:type", Array)
], UserEntity.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => connected_user_entity_1.ConnectedUserEntity, connection => connection.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "connections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => joined_room_entity_1.JoinedRoomEntity, joinedRoom => joinedRoom.room),
    __metadata("design:type", Array)
], UserEntity.prototype, "joinedRooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, messages => messages.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.CategoryEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UserEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => matching_entity_1.MatchingEntity, matches => matches.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "matches", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map
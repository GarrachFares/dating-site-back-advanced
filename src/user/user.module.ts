import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { MulterModule } from "@nestjs/platform-express";
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from 'src/chat/entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,CategoryEntity]),
    MulterModule.register({
    dest: './uploads/profile-pictures',
  })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}


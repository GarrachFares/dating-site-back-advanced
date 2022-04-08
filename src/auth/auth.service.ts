import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AddUserDto } from '../user/dto/add-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt' ;
import { CredentialsDto } from "../user/dto/credentials.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService , private jwtService : JwtService) {}

    async register(userData : AddUserDto) {
        const user = await this.userService.createUser({
          ...userData
        });
        const oldPassword = user.password
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try {
          await this.userService.addUser(user);
        } catch (e) {
          throw new ConflictException(`username ${user.username} or email ${user.email} already exists`);
        }
        
        //log the user in
        user.password = oldPassword
        return await   this.login(user)
      }
    
      
      async login(credentials: CredentialsDto) {
        let  {username , password}  = credentials ;
        /*
        * login via username or email
        * */
        const user = await this.userService.findUserByUsername(username)
        if(!user) throw new NotFoundException("username incorrect ") ;
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if(user.password!==hashedPassword)
          throw new NotFoundException(" password incorrect ") ;
        
        const {id,firstName,lastName,email,role} = user
        username = user.username 
        const  token = this.jwtService.sign(
            { id,firstName,lastName,username,email,role}
        )
        return {token}
      }
}

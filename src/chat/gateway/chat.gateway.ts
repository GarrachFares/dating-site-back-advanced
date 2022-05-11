import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

import { UserService } from 'src/user/user.service';
//import { Server } from 'typeorm';
import {  Server } from 'socket.io';
import { RoomService } from '../service/room-service/room/room.service';
import { PageI } from '../interfaces/page.interface';
import { MessageEntity } from "../entity/message.entity";
import { MessageService } from "../service/room-service/message.service";

@WebSocketGateway({ cors: { origin: ['https://hoppscotch.io', 'http://localhost:3000', 'http://localhost:4200'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server;

  constructor(private roomService:RoomService,
              private userService: UserService,
              private jwtService:JwtService,
              private authService: AuthService,
              private messageService : MessageService) {}

  async handleConnection(socket: Socket) {

    console.log("on connect");
        this.server.emit('message','test')
    try {
      
      const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
      //console.log(decodedToken);
      
      const user = await this.userService.findOne(decodedToken.id);
      if (!user) {
        console.log("fail");
        return this.disconnect(socket);
        
      } else {
        console.log(user);
        
        socket.data.user = user;
        const rooms = await this.roomService.getRoomsForUser( user.id, {page: 1, limit: 10});
        rooms.meta.currentPage --  //angular paginator
        // Only emit rooms to the specific connected client
        return this.server.to(socket.id).emit('rooms', rooms);
        console.log("on connect");
        this.server.emit('message','test')
      }
    } catch {
      console.log("Some error Occurred , Disconnecting ...");
      return this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
    
  }

  private disconnect(socket: Socket) {
    socket.emit('Error12', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: any) {
    //console.log(socket.data.user);
    console.log(room.users) ;
    console.log(room);
    // console.log(socket.data.user);
    // console.log(room.users) ;
    return await this.roomService.createRoom(room,socket.data.user);
  
  }

  @SubscribeMessage('paginateRooms')
  async  onPaginateRoom(socket: Socket, page : PageI) {
    page.limit = page.limit > 100 ? 100 : page.limit
    page.page ++ ; //angular paginator
    const rooms = await this.roomService.getRoomsForUser(socket.data.user.id,page);
    rooms.meta.currentPage -- //angular paginator
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(socket : Socket,message:MessageEntity){
    await this.messageService.createMessage(message,socket.data.user);
  }
  

}

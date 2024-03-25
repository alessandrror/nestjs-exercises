import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // This emit the message to every client (even the sender) that is connected to the socket!
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('messageserver', data);
  }

  // This emit the message to every client that is not the sender to everyone that is connected to the socket!
  @SubscribeMessage('broadcast')
  handleBroadcast(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    client.broadcast.emit('messageserver', data);
  }

  // We can send JSON data!
  @SubscribeMessage('onNewUser')
  handleNewUser(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    client.broadcast.emit('onNewUser', data);
  }
}

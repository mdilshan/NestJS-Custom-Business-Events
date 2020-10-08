/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/events' })
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('Socket Connection');
  private client: Socket = null;

  afterInit(server) {
    this.logger.log('Gateway initialized');
  }

  handleMessage(payload: any) {
    // if (this.client) {
    //   console.log('EMMITING');
    //   this.client.emit('newMessage');
    // }
    this.wss.emit('newMessage', payload);
  }

  @SubscribeMessage('join')
  onJoinRoom(client: Socket) {
    this.client = client;
    client.emit('connected');
  }

  @SubscribeMessage('leave')
  onLeaveRoom(client: Socket) {
    this.client = null;
    client.emit('disconnected');
  }
}

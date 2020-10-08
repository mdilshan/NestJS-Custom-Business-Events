/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

import { Test, TestingModule } from '@nestjs/testing';
import { SocketGateway } from './socket.gateway';

describe('SocketGateway', () => {
  let gateway: SocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketGateway],
    }).compile();

    gateway = module.get<SocketGateway>(SocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

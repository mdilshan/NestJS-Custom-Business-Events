/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Injectable()
export class RuleEngineService {
  private ruleClient: ClientProxy;

  constructor() {
    this.ruleClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }

  emitEvent<T>(e) {
    return this.ruleClient.send<T, any>('event', e);
  }

  getRule(q) {
    return this.ruleClient.send<any, any>('get_rule', q);
  }

  addRule(data: any) {
    return this.ruleClient.send<any, any>('add_rule', data);
  }

  editRule(data: any) {
    return this.ruleClient.send<any, any>('edit_rule', data);
  }

  deleteRule(id: string) {
    return this.ruleClient.send<any, any>('delete_rule', { id });
  }
}

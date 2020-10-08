/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

import {
  Controller,
  Body,
  Post,
  Get,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { RuleEngineService } from './rule-engine/rule-engine.service';
import { error_handler, requiredFieldsValidated } from 'src/utils/Utils';
import { catchError } from 'rxjs/operators';
import { SocketGateway } from './socket.gateway';
import { LoggerService } from '../LoggerModule/logger.service';

@Controller('rule-engine-module')
export class RuleEngineModuleController {
  constructor(
    private ruleEngineService: RuleEngineService,
    private socketGateway: SocketGateway
  ) {}

  @Get()
  get(@Query() query: any) {
    try {
      const validate = requiredFieldsValidated(query, [
        'query',
        'skip',
        'limit',
      ]);
      if (validate) throw validate;
      this.ruleEngineService
        .getRule(query)
        .pipe(
          catchError((err) => {
            const payload = {
              type: 'RPC_ERROR',
              payload: err,
            };
            console.log(payload);
            this.socketGateway.handleMessage(payload);
            throw err;
          })
        )
        .subscribe((res) => {
          const payload = {
            type: 'GET_RULE',
            payload: res,
          };
          console.log(payload);
          this.socketGateway.handleMessage(payload);
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  add(@Body() body) {
    try {
      this.ruleEngineService
        .addRule(body)
        .pipe(
          catchError((err) => {
            const payload = {
              type: 'RPC_ERROR',
              payload: err,
            };
            this.socketGateway.handleMessage(payload);
            throw err;
          })
        )
        .subscribe((res) => {
          const payload = {
            type: 'ADD_RULE',
            payload: res,
          };
          this.socketGateway.handleMessage(payload);
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Put()
  edit(@Body() body) {
    try {
      this.ruleEngineService
        .editRule(body)
        .pipe(
          catchError((err) => {
            const payload = {
              type: 'RPC_ERROR',
              payload: err,
            };
            this.socketGateway.handleMessage(payload);
            throw err;
          })
        )
        .subscribe((res) => {
          const payload = {
            type: 'EDIT_RULE',
            payload: res,
          };
          this.socketGateway.handleMessage(payload);
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  delete(@Param() param) {
    try {
      this.ruleEngineService
        .deleteRule(param['id'])
        .pipe(
          catchError((err) => {
            const payload = {
              type: 'RPC_ERROR',
              payload: err,
            };
            this.socketGateway.handleMessage(payload);
            throw err;
          })
        )
        .subscribe((res) => {
          const payload = {
            type: 'DELETE_RULE',
            payload: res,
          };
          this.socketGateway.handleMessage(payload);
        });
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

import { Injectable } from '@nestjs/common';
import { Action } from 'rxjs/internal/scheduler/Action';
import { catchError } from 'rxjs/operators';
import { AcitonTypes } from '../actions/action-types';
import { RuleEngineService } from '../rule-engine/rule-engine.service';
import { SocketGateway } from '../socket.gateway';
import {
  EventTypes,
  iEventPayload,
  IRuleMessage,
  OnInvoiceAddPayload,
  OnInvoiceDeletePayload,
} from './event-types';

@Injectable()
export class EventService {
  constructor(
    private socketGateway: SocketGateway,
    private ruleService: RuleEngineService
  ) {}

  emit(
    type: typeof EventTypes.ON_INVOICE_ADD,
    payload: OnInvoiceAddPayload,
    cb: () => void
  );
  emit(
    type: typeof EventTypes.ON_INVOICE_DELETE,
    payload: OnInvoiceDeletePayload,
    cb: () => void
  );
  emit(type?: any, payload?: any, cb?: any) {
    this.ruleService
      .emitEvent<IRuleMessage[]>(payload)
      .pipe(
        catchError((err) => {
          const payload = {
            type: 'RPC_ERROR',
            payload: err,
          };
          console.log(payload);
          //logger
          this.socketGateway.handleMessage(payload);
          throw err;
        })
      )
      .subscribe((res) => {
        const payload = {
          type: 'RULE_RESULT',
          payload: res,
        };
        console.log(payload);
        // if failed delete the last added invoice
        // action(res);
        // TODO check the action from the response
        if (res && res.length == 0) {
          return;
        }

        res.map((rule_result) => {
          if (rule_result.isPass) {
            // The rule is triggered, Do the action
            switch (rule_result.event.action_name) {
              case AcitonTypes.UNDO_ACTIVITY:
                this.socketGateway.handleMessage({
                  type: AcitonTypes.SEND_NOTIFICATION,
                  payload: {
                    notification_type: 'ERROR',
                    message: `Failed! The rule "${rule_result.rule_title}" is prevent the process`,
                  },
                });
                break;

              case AcitonTypes.SEND_NOTIFICATION:
                cb();
                this.socketGateway.handleMessage({
                  type: AcitonTypes.SEND_NOTIFICATION,
                  payload: {
                    notification_type: 'INFO',
                    message: `The rule "${rule_result.rule_title}" is triggered`,
                  },
                });
            }
          }
        });
      });
  }
}

/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

export enum EventTypes {
  ON_INVOICE_ADD = 'on_invoice_add',
  ON_INVOICE_DELETE = 'on_invoice_delete',
  ON_INVOICE_EDIT = 'on_invoice_edit',

  ON_ORDER_ADD = 'on_order_add',
  ON_ORDER_EDIT = 'on_order_edit',
  ON_ORDER_DELETE = 'on_order_delete',

  // ADD ANY TYPE YOU WANT...
}

export interface IRuleMessage {
  _id?: string;
  isPass: boolean;
  rule_title: string;
  correspond_event: string;
  rules: {
    any: { fact: string; operator: string; value: any; path: string }[];
    all: { fact: string; operator: string; value: any; path: string }[];
  };
  event: {
    action_name: string;
    params: {
      message: string;
      result: boolean;
    };
  };
}

export interface iEventPayload {
  event_name: string;
  //db_id: number;
  fact: object;
}

export class OnInvoiceAddPayload implements iEventPayload {
  event_name: string;
  //db_id: number;
  fact: {
    customer_email: string;
    invoice_value: string;
    isPaid: boolean;
  };
}
export class OnInvoiceDeletePayload implements iEventPayload {
  event_name: string;
  //db_id: number;
  fact: {
    customer_email: string;
    invoice_value: string;
    isPaid: boolean;
  };
}

/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

import { Test, TestingModule } from '@nestjs/testing';
import { RuleEngineService } from './rule-engine.service';

describe('RuleEngineService', () => {
  let service: RuleEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleEngineService],
    }).compile();

    service = module.get<RuleEngineService>(RuleEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

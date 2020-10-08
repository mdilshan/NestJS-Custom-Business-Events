/**
 * Copyright (c) 2020 Maduka Dilshan
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of https://github.com/mdilshan/NestJS-Custom-Business-Events
 *
 * @author - https://github.com/mdilshan
 */

import { Test, TestingModule } from '@nestjs/testing';
import { RuleEngineModuleController } from './rule-engine-module.controller';

describe('RuleEngineModule Controller', () => {
  let controller: RuleEngineModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleEngineModuleController],
    }).compile();

    controller = module.get<RuleEngineModuleController>(
      RuleEngineModuleController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

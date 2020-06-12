import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserAsRegisteredManagerService } from './validate-user-as-registered-manager.service';

describe('ValidateUserAsRegisteredManagerService', () => {
  let service: ValidateUserAsRegisteredManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateUserAsRegisteredManagerService],
    }).compile();

    service = module.get<ValidateUserAsRegisteredManagerService>(
      ValidateUserAsRegisteredManagerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

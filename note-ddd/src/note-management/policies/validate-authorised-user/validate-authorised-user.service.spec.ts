import { Test, TestingModule } from '@nestjs/testing';
import { ValidateAuthorisedUserPolicy } from './validate-authorised-user.service';

describe('ValidateAuthorisedUserService', () => {
  let service: ValidateAuthorisedUserPolicy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateAuthorisedUserPolicy],
    }).compile();

    service = module.get<ValidateAuthorisedUserPolicy>(
      ValidateAuthorisedUserPolicy,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

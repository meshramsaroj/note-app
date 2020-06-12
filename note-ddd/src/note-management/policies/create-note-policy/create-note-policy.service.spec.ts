import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotePolicyService } from './create-note-policy.service';

describe('CreateNotePolicyService', () => {
  let service: CreateNotePolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateNotePolicyService],
    }).compile();

    service = module.get<CreateNotePolicyService>(CreateNotePolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

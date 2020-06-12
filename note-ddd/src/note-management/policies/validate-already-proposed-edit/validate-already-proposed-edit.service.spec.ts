import { Test, TestingModule } from '@nestjs/testing';
import { ValidateAlreadyProposedEditService } from './validate-already-proposed-edit.service';
import { ProposeEditService } from '../../entities/propose-edit/propose-edit.service';

describe('ValidateAlreadyProposedEditService', () => {
  let service: ValidateAlreadyProposedEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateAlreadyProposedEditService,
        {
          provide: ProposeEditService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ValidateAlreadyProposedEditService>(
      ValidateAlreadyProposedEditService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

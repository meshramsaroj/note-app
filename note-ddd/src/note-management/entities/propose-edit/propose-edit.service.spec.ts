import { Test, TestingModule } from '@nestjs/testing';
import { ProposeEditService } from './propose-edit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NoteEdit } from './edit-note.entity';

describe('ProposeEditService', () => {
  let service: ProposeEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProposeEditService,
        {
          provide: getRepositoryToken(NoteEdit),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProposeEditService>(ProposeEditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

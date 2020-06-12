import { Test, TestingModule } from '@nestjs/testing';
import { NoteSampleHelperService } from './note-sample-helper.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';

describe('NoteSampleHelperService', () => {
  let service: NoteSampleHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteSampleHelperService,
        {
          provide: getRepositoryToken(NoteEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NoteSampleHelperService>(NoteSampleHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

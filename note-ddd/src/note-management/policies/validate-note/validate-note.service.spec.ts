import { Test, TestingModule } from '@nestjs/testing';
import { ValidateNoteService } from './validate-note.service';
import { NoteService } from '../../entities/note/note.service';

describe('ValidateNoteService', () => {
  let service: ValidateNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateNoteService,
        {
          provide: NoteService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ValidateNoteService>(ValidateNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

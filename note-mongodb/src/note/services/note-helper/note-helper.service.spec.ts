import { Test, TestingModule } from '@nestjs/testing';
import { NoteHelperService } from './note-helper.service';
import { NoteSampleHelperService } from '../../entities/note-sample-helper/note-sample-helper.service';
describe('NoteHelperService', () => {
  let service: NoteHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteHelperService,
        {
          provide: NoteSampleHelperService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NoteHelperService>(NoteHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

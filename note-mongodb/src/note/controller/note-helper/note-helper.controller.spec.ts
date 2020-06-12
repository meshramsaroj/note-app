import { Test, TestingModule } from '@nestjs/testing';
import { NoteHelperController } from './note-helper.controller';
import { NoteHelperService } from '../../services/note-helper/note-helper.service';
describe('NoteHelper Controller', () => {
  let controller: NoteHelperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteHelperController],
      providers: [
        {
          provide: NoteHelperService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<NoteHelperController>(NoteHelperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

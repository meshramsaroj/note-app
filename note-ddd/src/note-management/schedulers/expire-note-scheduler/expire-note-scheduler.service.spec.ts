import { Test, TestingModule } from '@nestjs/testing';
import { ExpireNotesSchedulerService } from './expire-note-scheduler.service';

describe('ExpireNoteSchedulerService', () => {
  let service: ExpireNotesSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpireNotesSchedulerService,
        {
          provide: ExpireNotesSchedulerService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ExpireNotesSchedulerService>(
      ExpireNotesSchedulerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Injectable, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { NoteService } from '../../entities/note/note.service';

export const NOTE_CLEANUP_CRON_STRING = '* 5 * * * *';
@Injectable()
export class ExpireNotesSchedulerService implements OnModuleInit {
  constructor(private readonly noteExpire: NoteService) {}

  async onModuleInit() {
    const job = new CronJob(NOTE_CLEANUP_CRON_STRING, async () => {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() - 10);
      await this.noteExpire.updateMany(expiryDate);
    });
    job.start();
  }
}

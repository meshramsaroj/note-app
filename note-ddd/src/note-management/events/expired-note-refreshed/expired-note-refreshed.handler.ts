import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ExpiredNoteRefreshedEvent } from './expired-note-refreshed.event';
import { NoteService } from '../../entities/note/note.service';

@EventsHandler(ExpiredNoteRefreshedEvent)
export class ExpiredNoteRefreshedHandler
  implements IEventHandler<ExpiredNoteRefreshedEvent> {
  constructor(private readonly noteService: NoteService) {}

  async handle(event: ExpiredNoteRefreshedEvent) {
    const { note } = event;
    const provider = await this.noteService.findNote(note);
    await this.noteService.refreshExpiredNote(provider);
  }
}

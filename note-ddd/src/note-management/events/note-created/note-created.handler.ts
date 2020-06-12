import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NoteCreatedEvent } from './note-created.event';
import { NoteService } from '../../entities/note/note.service';

@EventsHandler(NoteCreatedEvent)
export class NoteCreatedHandler implements IEventHandler<NoteCreatedEvent> {
  constructor(private readonly noteService: NoteService) {}

  async handle(event: NoteCreatedEvent) {
    const { note: notePayload } = event;
    await this.noteService.create(notePayload);
  }
}

import { IEvent } from '@nestjs/cqrs';
import { NoteDto } from '../../entities/note/note.dto';

export class NoteCreatedEvent implements IEvent {
  constructor(public note: NoteDto) {}
}

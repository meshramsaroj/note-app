import { IEvent } from '@nestjs/cqrs';
import { Note } from '../../entities/note/note.entity';
import { NoteEdit } from '../../entities/propose-edit/edit-note.entity';

export class NoteDeletedEvent implements IEvent {
  constructor(public note: Note, public editNote: NoteEdit) {}
}

import { IEvent } from '@nestjs/cqrs';
import { EditNoteDto } from 'src/note-management/entities/propose-edit/edit-note.dto';
// import { NoteDto } from '../../entities/note/note.dto';

export class NoteEditProposedEvent implements IEvent {
  constructor(public note: EditNoteDto) {}
}

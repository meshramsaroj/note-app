import { ICommand } from '@nestjs/cqrs';
import { EditNoteDto } from 'src/note-management/entities/propose-edit/edit-note.dto';

export class ProposeNoteEditCommand implements ICommand {
  constructor(public note: EditNoteDto) {}
}

import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NoteEditProposedEvent } from './note-edit-proposed.event';
import { ProposeEditService } from '../../entities/propose-edit/propose-edit.service';
import { NoteService } from '../../entities/note/note.service';
// import { NoteDto } from 'src/note-management/entities/note/note.dto';

@EventsHandler(NoteEditProposedEvent)
export class NoteEditProposedHandler
  implements IEventHandler<NoteEditProposedEvent> {
  constructor(
    private readonly proposedEditService: ProposeEditService,
    private readonly noteService: NoteService,
  ) {}

  async handle(event: NoteEditProposedEvent) {
    const { note } = event;
    await this.proposedEditService.createProposalForNoteEdit(note);
    const provider = await this.proposedEditService.findNoteAlreadyProposed(
      note.noteUuid,
    );
    await this.noteService.foundNote(provider.noteUuid);
  }
}

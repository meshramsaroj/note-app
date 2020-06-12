import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NoteEditApprovedEvent } from './note-edit-approved.event';
import { ProposeEditService } from '../../entities/propose-edit/propose-edit.service';
import { NoteService } from '../../entities/note/note.service';

@EventsHandler(NoteEditApprovedEvent)
export class NoteEditApprovedHandler
  implements IEventHandler<NoteEditApprovedEvent> {
  constructor(
    private readonly proposeEditService: ProposeEditService,
    private readonly noteService: NoteService,
  ) {}

  async handle(event: NoteEditApprovedEvent) {
    const { noteUuid } = event;
    const provider = await this.proposeEditService.findNoteAlreadyProposed(
      noteUuid,
    );
    await this.noteService.update(provider);
    await this.proposeEditService.removeProposedNote(noteUuid);
  }
}

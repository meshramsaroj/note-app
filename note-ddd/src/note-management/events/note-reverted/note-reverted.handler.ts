import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NoteEditRevertedEvent } from './note-reverted.event';
import { NoteService } from '../../entities/note/note.service';
import { ProposeEditService } from '../../entities/propose-edit/propose-edit.service';

@EventsHandler(NoteEditRevertedEvent)
export class NoteEditRevertedHandler
  implements IEventHandler<NoteEditRevertedEvent> {
  constructor(
    private readonly proposedEditService: ProposeEditService,
    private readonly noteService: NoteService,
  ) {}

  async handle(event: NoteEditRevertedEvent) {
    const { uuid } = event;
    await this.proposedEditService.deleteNoteAlreadyProposed(uuid);
    await this.noteService.updateNoteProposedFlag(uuid);
  }
}

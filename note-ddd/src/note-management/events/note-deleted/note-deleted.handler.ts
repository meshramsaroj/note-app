import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NoteDeletedEvent } from './note-deleted.event';
import { NoteService } from '../../entities/note/note.service';
import { ProposeEditService } from '../../entities/propose-edit/propose-edit.service';

@EventsHandler(NoteDeletedEvent)
export class NoteDeletedHandler implements IEventHandler<NoteDeletedEvent> {
  constructor(
    private readonly noteService: NoteService,
    private readonly proposedEditService: ProposeEditService,
  ) {}
  async handle(event: NoteDeletedEvent) {
    const { note, editNote } = event;
    await this.noteService.delete(note);
    if (editNote) {
      await this.proposedEditService.deleteProposedNote(editNote);
    }
  }
}

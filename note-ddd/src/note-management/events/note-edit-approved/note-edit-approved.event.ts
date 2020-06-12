import { IEvent } from '@nestjs/cqrs';
// import { EditNoteDto } from "../../entities/propose-edit/edit-note.dto";

export class NoteEditApprovedEvent implements IEvent {
  constructor(public noteUuid: string) {}
}

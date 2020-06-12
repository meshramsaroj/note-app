import { ICommand } from '@nestjs/cqrs';
// import { EditNoteDto } from "../../entities/propose-edit/edit-note.dto";

export class ApproveNoteEditCommand implements ICommand {
  constructor(public noteUuid: string) {}
}

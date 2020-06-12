import { ICommand } from '@nestjs/cqrs';

export class DissapprovedNoteEditCommand implements ICommand {
  constructor(public noteUuid: string) {}
}

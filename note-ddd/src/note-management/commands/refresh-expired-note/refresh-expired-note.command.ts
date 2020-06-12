import { ICommand } from '@nestjs/cqrs';

export class RefreshExpiredNoteCommand implements ICommand {
  constructor(public uuid: string, public readonly req: any) {}
}

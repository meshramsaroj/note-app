import { IQuery } from '@nestjs/cqrs';

export class RetrieveNoteQuery implements IQuery {
  constructor(public readonly uuid: string, public readonly req: any) {}
}

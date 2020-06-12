import { IEvent } from '@nestjs/cqrs';

export class ExpiredNoteRefreshedEvent implements IEvent {
  constructor(public note: string) {}
}

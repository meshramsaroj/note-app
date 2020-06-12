import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RefreshExpiredNoteCommand } from './refresh-expired-note.command';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@CommandHandler(RefreshExpiredNoteCommand)
export class RefreshExpiredNoteHandler
  implements ICommandHandler<RefreshExpiredNoteCommand> {
  constructor(
    private readonly manager: NoteAggregateService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RefreshExpiredNoteCommand) {
    const { uuid, req } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.refreshExpiredNote(uuid, req);
    aggregate.commit();
  }
}

import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { DissapprovedNoteEditCommand } from './dissapprove-note.command';
import { NoteAggregateService } from '../../aggregates/note-aggregate/note-aggregate.service';

@CommandHandler(DissapprovedNoteEditCommand)
export class DissapprovedNoteEditHandler
  implements ICommandHandler<DissapprovedNoteEditCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly manager: NoteAggregateService,
  ) {}

  async execute(command: DissapprovedNoteEditCommand) {
    const { noteUuid } = command;

    const aggregate = this.publisher.mergeObjectContext(this.manager);

    await aggregate.dissapproveEditNote(noteUuid);
    aggregate.commit();
  }
}
